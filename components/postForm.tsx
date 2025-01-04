'use client'

import React, { useEffect, useState } from 'react';
import { Post, User } from "@prisma/client";
import { Textarea } from "@/components/ui/textarea"
import {  Like} from '@/app/api/actions';

 import { useSocket } from '@/Context/SocketContext';
import { toast } from 'sonner';

// import { io } from 'socket.io-client';
;

interface CommentWithUser {
  commentId: string;
  userId: string;
  text: string;
  createdAt: Date;
  user: User; 
}

interface PostProps {
  post: Post;
  user: User;
  initialComments: CommentWithUser[];
  likeCount: number;
   liked: Boolean;
   postUser : User ;
   followed: boolean
}

export default function PostForm({ post, user, initialComments, likeCount, liked, postUser, followed  }: PostProps) {
    const [showCommentBox, setShowCommentBox] = useState(false);
    const [comments,setComments]=useState<CommentWithUser[]>(initialComments || []) //Je veux utiliser les sockets pour permettre la publication des commentaires en temps réel
    const [showButton, setShowButton] = useState(false);
  const [commentText, setCommentText] = useState(''); 
  const [followedState, setFollowedState]= useState(followed); 
 const [likeState, setLikeState]= useState(liked);
 const [LikeCount, setLikeCount]=useState(likeCount)
 const socket = useSocket();
useEffect(() => {
 
  if (socket) {
    
    socket.on('commentAdded', (data) => {
      setComments((prevComments) => [...prevComments, data.comment]); // Update UI
    });
    socket.on('followUpdated', (data)=>{
      if( data == 'follow'){
        setFollowedState(true)
      }
      else if (data =='unfollow'){
        setFollowedState(false)
      }

    })
    const handleNewNotification = (notification: { message: any; }) => {
      toast(notification.message, {
        duration: 3000,
        style: {
          background: '#333',
          color: '#fff',
        },
      });
    };
    if (socket){
      socket.on('newNotification', handleNewNotification);
    }

  // socket.on('likePost', (msg)=>{
  //   console.log(msg)
  // })
 
  //  socket.on('unlikePost',(msg)=>{
  //   console.log(msg)
  //  })
  socket.on('likeStateUpdated', ({ postId, likeState }) => {
    // Only update the like state for the specific user who clicked the like button
    if (postId === post.postId) {
      setLikeState(likeState);  // Only modify the state for the relevant post
    }
  });
  
    socket.on('likeUpdated', (data) => {
     
      setLikeCount(prev=>data);
      
      
      console.log('Like count updated:', data);
      
    });

   
    // socket.on('commentAdded',(data)=>{
    //   //C'est supposé etre ici 
    //   //mais vu l'emplacement du serveur pour les sockets ainsi que le fait qu'il soit en javascript c'est pas faisable puisque mon backend est en typescript
      


    // })

    return () => {
      socket.off('commentAdded');
      socket.off('likeStateUpdated');
    
      socket.off('likeUpdated');
  
    };
  }
}, [socket]);

 
const handleLike = async () => {
  
 
   
    if (socket){
      
       socket.emit('likePost', { userId:user.id,postId: post.postId });

      
       
    }

    
    
   

  
};

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(e.target.value);
    setShowButton(e.target.value.trim().length > 0); 
  };
  const handleCommentPublishing = async (userId: string, postId: string, text: string) => {
    // Emit the comment to the server
    if (socket) {
      socket.emit('newComment', { postId,userId, text });
    }
  };
  const handleFollow = async (userId1: string, userId2: string) => {
    // Emit the comment to the server
    if (socket) {
      socket.emit('followRequest', {userId1,userId2 });
    }
  };
  
    const handleComment = () => {
        
        setShowCommentBox(!showCommentBox); 
      };
      const handleKeyDown = async (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          
          await handleCommentPublishing(user.id,post.postId,commentText)
          setShowCommentBox(!showCommentBox);
        }
      };
    
  return (
    <div className="bg-gray-900 text-white p-6 mt-16 ">
    
      {/* User Information */}
      <div className="flex items-center mb-4">
        <a href={`/profile/${postUser.id}`}>
        <img src={postUser.image} alt={postUser.name || 'User'} className="w-12 h-12 rounded-full object-cover mr-3" />
        </a>
        <div>
          <a href={`/profile/${postUser.id}`}>
          <h3 className="text-lg font-semibold">{postUser.name || 'Unknown User'}</h3>
          </a>
        </div>
        
        {user.id!=postUser.id && followedState===false &&
          <button onClick={()=>handleFollow(user.id,postUser.id)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>
</button>}
        {user.id!=postUser.id && followedState &&
          <button onClick={()=>handleFollow(user.id,postUser.id)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
        
</button>}
       
      </div>

      {/* Post Content */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-red-800 mb-4">Topic: {post.topic}</h1>
        <h2 className="text-xl font-bold text-gray-300 text-center">{post.title}</h2>
        <p className="text-gray-300 mt-2">{post.body}</p>
        {post.image && (
          <div className='flex justify-center'>
            <img src={post.image} alt="Post Image" className="object-cover mt-4 rounded-md" />
          </div>
        )}
      </div>
     

      {/* Actions */}
      <div className="flex justify-between items-center mt-6 mb-4">
        <button 
          onClick={handleLike} 
          className={`flex items-center ${likeState ? 'text-red-700' : 'text-gray-300'} hover:text-red-700`}
        > 
       
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 mr-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
          </svg> 
          <span>{LikeCount}</span>
        </button> 
        <button 
          onClick={() => handleComment()} 
          
          className="text-gray-300 hover:text-red-700 flex items-center"
        >
          {/* Comment button */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 mr-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
          </svg>
          <span>{comments.length}</span>
        </button>
      </div>

      {/* Comments Section */}
      <div className="mt-6 ">
        {/* Textarea and Button Container */}
        {showCommentBox && (
          <div className="relative flex items-center">
            <textarea
              placeholder={comments.length > 0 ? 'Write your comment.' : 'Be the first one to comment.'}
              id='commentBox'
              className='bg-gray-950 text-gray-300 p-2 rounded w-full pr-16' // Add padding-right for button
              value={commentText}
              onChange={handleTextareaChange}
              onKeyDown={handleKeyDown}
            />
            {showButton && (
              <button
                className="absolute right-2 bottom-2 mb-3 hover:text-red-700"
                onClick={() => handleCommentPublishing(user.id,post.postId,commentText)}
               
              >
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
</svg>

              </button>
            )}
          </div>
        )}

        {comments.length > 0 ? ( 
          comments.map(comment => (
            <div key={comment.commentId} className="bg-gray-800 p-4 rounded-lg mb-2">
              <div className="flex items-center mb-2">
                <img src={comment.user.image} alt={comment.user.name || 'User'} className="w-8 h-8 rounded-full object-cover mr-2" />
                <div>
                  <h4 className="text-sm font-semibold">{comment.user.name || 'Unknown User'}</h4>
                  <p className="text-gray-400 text-xs">{new Date(comment.createdAt).toLocaleDateString('en-US', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
 
})}</p>
                </div>
              </div>
              <p>{comment.text}</p>
            </div>
          ))
        ) : (
            <p className="text-gray-400 mt-4">No comments yet.</p>
         
        )}
      </div>
    </div>
  );
}



