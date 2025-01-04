import { PrismaClient } from "@prisma/client";
import PostForm from "@/components/postForm";
import { useRouter } from "next/navigation";

import {getServerSession} from "next-auth/next";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {redirect} from 'next/navigation';

interface PostPageProps {
  params: { id: string };
}
const prisma= new PrismaClient();


export default async function Post({ params }: PostPageProps) {
   
    
  const session = await getServerSession(authOptions);
  if(!session){
      return redirect('/');
    
  }
  else{
    try {
      var liked= false
      var followed= false
      const email= session.user.email as string
    const { id } = params;
    const post = await prisma.post.findUnique({where:{postId:id}, include:{
      likes:true,
      user:true,
      comments: {include:{user:true}}
    }})
    if (post){
    const user= await prisma.user.findUnique({where:{email},
      include :{
        followedBy: true,
        following : true
      }}
    )
    const isFollowing = user?.following.some(follow => follow.followingId ==post.userId);
    if (isFollowing){
      followed= true
    }
    const like= await prisma.like.findFirst({where: {
      postId: id,
      userId: user?.id,
    }},)
    if(like){liked=true}
    if(user){

   

      return(<PostForm post={post} postUser={post.user} likeCount={post.likes.length} user={user} initialComments={post.comments} liked={liked} followed={followed} />)
    }
    
 
    }

      
    } catch (error) {
      console.log(error)
      
    }
   
    

    
  } 
}
 

