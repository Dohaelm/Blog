'use server'
import { PrismaClient } from '@prisma/client';

import type { NextApiRequest, NextApiResponse } from 'next';
import { number, ZodError } from 'zod';
import { transformZodErrors } from '@/lib/transformZodErrors';
import { redirect } from 'next/navigation';

const prisma=new PrismaClient();
 
export  async function Save(formState: {message: string} , formData: FormData):Promise< {message: string}>{
    try{
      const email= formData.get('email') as string;
      const name= formData.get('name') as string;
      const interests=formData.getAll('interest') as unknown as string ;
      const image=formData.get('profilePicUrl') as string;
      const bio= formData.get('bio') as string;
      const user= await prisma.user.findFirst({where:{email}})
     
    
     

      
      if(name.length<2){
      return {message:'Name should at least contain 2 characters.'} 
      }
        

       
     const updatedUser = await prisma.user.update({
           where:{
            email 
         },
            data: {name,
               image,
               bio,
              
             interests : interests as unknown as string []
            
            },
          });

          console.log('User updated:', updatedUser);
 
        
       return {message:'Modifications have been successfully applied.'}

      
          
        
      }
     
   catch(err : unknown){
    if (err instanceof ZodError) {
      const formattedErrors = transformZodErrors(err)
       
           return {message : formattedErrors }

        
    }else {
      return {message:'Something went wrong'}
    }

   }
  
 
}
    export async function createPost(formState: {message: string} , formData: FormData):Promise< {message: string}>{
      try{
     
      const title = formData.get('postTitle') as string
      const image = formData.get('postImage') as string
      const body= formData.get('postBody') as string
      const email= formData.get('userEmail') as string
      const topic = formData.get('topic') as string     
      const user= await prisma.user.findUnique({where:{email}}) 
      if(user){
        if (!title){
          return {message:"title is required."}
        }
        else if (!topic){
          return {message:"topic is required."}
        }
      else   if (!body){
          return {message:"body is required."}
        }
      else{  const post= await prisma.post.create({
          data:{
            title,
            image,
            body,
            userId:user.id,
            topic
          }
         })
         return {message : "Post successfully uploaded."}
        }

    }
    else{
      return {message:"Something went wrong."}
    }
  }

    catch(err: unknown){
      if (err instanceof ZodError) {
        const formattedErrors = transformZodErrors(err)
         
             return {message : formattedErrors }
  
          
      }else {
        return {message:'Something went wrong.'}
      }
    }
  }
    
  export async function Like(userId: string, postId: string) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    const post = await prisma.post.findUnique({ where: { postId } });
    const previousLike = await prisma.like.findFirst({ where: { userId: user?.id } });
    const previousNotification= await prisma.notification.findFirst({where : {actorId : user?.id, userId: post?.userId, postId:post?.postId}})
  
    if (user && post) {
      if (!previousLike) {
        await prisma.like.create({
          data: { userId, postId },
        });
        await prisma.notification.create({
          data: {
            actorId: user.id  , 
            userId : post.userId , 
            postId: post.postId,
            type : 'like' , 
            message: `${user.name} liked your post.`


          }
        })
     
      } else {
        await prisma.like.delete({
          where: { likeId: previousLike.likeId },
        });
        if (previousNotification){
          await prisma.notification.delete({
            where :{
              id : previousNotification.id
  
            }
          })
        }
      
        
      }
      
    
    }
   
  
    // Handle case where user or post doesn't exist
   
  }


  // export async function Comment(userId: string, postId: string, text: string, io: any) {
  //   const user = await prisma.user.findUnique({ where: { id: userId } });
  //   const post = await prisma.post.findUnique({ where: { postId } });
    
  //   if (user && post && text) {
  //     const comment = await prisma.comment.create({
  //       data: {
  //         userId,
  //         postId,
  //         text
  //       }
  //     });
  
  //     // Emit the new comment to all connected clients
  //     io.emit('commentAdded', {
  //       postId,
  //       comment: {
  //         userId: user.id,
  //         username: user.name, // Assuming you have a username field
  //         text: comment.text,
  //         createdAt: comment.createdAt,
  //       }
  //     });
  
  //     // No redirect needed for real-time update
  //     return comment; // Return the comment data if needed for response
  //   } else {
  //     throw new Error('User or post not found');
  //   }
  // }
export async function DeleteComment(commentId : string, postId : string){
  
  
    await prisma.comment.delete({where:{
      commentId
     
    }})
    redirect (`/post/${postId}`)
  


}

export async function DeletePost(postId:string){
  await prisma.post.delete({where: {postId}})
  redirect('/profile')
}
 
