import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';
import { Server as SocketServer } from 'socket.io';


import { PrismaClient } from '@prisma/client';
const users = new Map();
const prisma = new PrismaClient();

export async function Comment(userId: string, postId: string, text: string, io: any) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  const post = await prisma.post.findUnique({ where: { postId } });
  const postUser= await prisma.user.findUnique({ where: { id: post?.userId } });
  const postOwnerSocketId = users.get(postUser?.id);
   if (user && post && text) {
     const comment = await prisma.comment.create({
       data: {
        postId,
        userId,
         text
       }
     });
     if(userId!=post.userId){
      const notification = await prisma.notification.create({data:{
        postId,
        actorId : userId,
        userId : post.userId,
        type : 'comment',
        message : `${user.name} commented your post.`
  
       }})
       
       io.to(postOwnerSocketId).emit('newNotification', notification)
     }
    

    // Emit the new comment to all connected clients
    io.emit('commentAdded', {
      postId,
      comment: {
        userId: user.id,
        user: user,
        commentId:comment.commentId,
        username: user.name,
        text: comment.text, 
        createdAt: comment.createdAt,
      }
    });

  //   // No redirect needed for real-time update
    return comment; // Return the comment data if needed for response
   } else {
     throw new Error('User or post not found');
   }
}
export async function follow(followerId: string , followingId: string,  io: any){
  const follower= await prisma.user.findUnique({where: {id:followerId}, include :{
    followedBy: true,
    following: true
  }})
  const following= await prisma.user.findUnique({where: {id:followingId}, include :{
    followedBy: true,
    following: true
  }})
  const followingSocketId = users.get(following?.id);
    const followerSocketId=users.get(follower?.id)
    
  if (follower && following ){
    const isFollowing = await prisma.follow.findFirst({
      where: {
        followerId, // The current user's ID
        followingId// The ID of the user who owns the post
      }
    });
    if(!isFollowing){
    const follow = await prisma.follow.create({
      data: {
        followerId,
        followingId
      }
    })
    
    io.to(followerSocketId).emit('followUpdated', 'follow');
   
    const notification = await prisma.notification.create({data:{
    
      actorId : followerId,
      userId : followingId,
      type : 'follow',
      message : `${follower.name} followed you.`

     }})
     
     io.to(followingSocketId).emit('newNotification', notification)
   
  }
  else{
    const unfollow= await prisma.follow.delete({
      where : {
        id : isFollowing.id
      }
    })
    const previousNotification= await prisma.notification.findFirst({where : {actorId : followerId, userId:followingId, type:'follow'}})
    if(previousNotification){
      await prisma.notification.delete({
        where : {
          id : previousNotification.id
        }
      })
    }
    io.to(followerSocketId).emit('followUpdated', 'unfollow')
  }
}
  else {
    throw new Error ('user not found')
  }

}
export async function Like(userId: string, postId: string, io: any) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  const post = await prisma.post.findUnique({ where: { postId }, include: { likes: true } });
  const previousLike = await prisma.like.findFirst({ where: { userId: user?.id } });
  const likeReceiverSocketId = users.get(post?.userId);
  const previousNotification = await prisma.notification.findFirst({
    where: { actorId: user?.id, userId: post?.userId, postId: post?.postId },
  });

  if (user && post) {
    let likeState = false;  // Default to unliked

    if (!previousLike) {
      await prisma.like.create({
        data: { userId, postId },
      });
      if(user.id!=post.userId){
        const notification = await prisma.notification.create({
          data: {
            actorId: user.id,
            userId: post.userId,
            postId: post.postId,
            type: 'like',
            message: `${user.name} liked your post.`,
          },
        });
  
       
        io.to(likeReceiverSocketId).emit('newNotification', notification);

      }

    

      likeState = true;  // User liked the post
    } else {
      await prisma.like.delete({
        where: { likeId: previousLike.likeId },
      });

      if (previousNotification) {
        await prisma.notification.delete({
          where: { id: previousNotification.id },
        });
      }

      likeState = false;  // User unliked the post
    }

    // Fetch the updated post after the like/unlike operation
    const updatedPost = await prisma.post.findUnique({
      where: { postId },
      include: { likes: true },
    });

    const likeCountOfPost = updatedPost?.likes.length ?? 0;

    // Emit updated like count to all users
    io.emit('likeUpdated', likeCountOfPost);

    // Emit like state only to the user who performed the action
    const userSocketId = users.get(userId);
    io.to(userSocketId).emit('likeStateUpdated', { postId, likeState });
  } else {
    throw new Error('User not found');
  }
}

const port = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url!, true);
    handle(req, res, parsedUrl);
  });

  // Initialize Socket.IO server
  const io = new SocketServer(server, {
    cors: {
      origin: "*", // Replace '*' with your client origin for better security
      methods: ["GET", "POST"],
    }
  });

  // Socket.IO event handling
  io.on('connection', (socket) => {
    const userId = socket.handshake.query.userId;
   

    users.set(userId, socket.id);
    console.log(users)
    console.log('New client connected');

    socket.on('likePost', async(data) => {
      console.log('likePost event received:', data);
      const {userId, postId}= data
      try{
     await Like(userId, postId, io)}
     catch(error){
      console.log(error)
     }
      
      
     
      
    });
    socket.on('followRequest',async(data)=>{
      const {userId1 , userId2}= data
      try{
        await follow(userId1,userId2,io)
      }
      catch (error){
        console.log(error)
      }
    })
  
    // Another custom event
   
    socket.on('newComment', async (data) => {
      const { postId,userId, text } = data;
      console.log(data)
      
       try {
        await Comment(userId, postId, text, io); // Pass io to the Comment function
       } catch (error) {
       console.error('Error adding comment:', error);
      }
    });
    socket.on('message', (msg) => {
      console.log('Message received:', msg);
      io.emit('message2',"Hello from server!"); // Broadcast the message
    });

    socket.on('disconnect', () => {
      users.delete(userId);
      console.log('Client disconnected');
    });
  });

  // Listen on the same port
  server.listen(port, () => {
    console.log(`> Server listening at http://localhost:${port} as ${dev ? 'development' : process.env.NODE_ENV}`);
  });
});
