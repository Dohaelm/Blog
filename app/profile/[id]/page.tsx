import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from 'next/navigation';
import UserProfile from "@/components/UserProfile";
import { PrismaClient } from "@prisma/client";
import { string } from "zod";
interface ProfilePageProps {
    params: { id: string };
  }
// Mark this as a server component by making it async
export default async function Profile({ params }: ProfilePageProps) {
    // Fetch the session data on the server
    const session = await getServerSession(authOptions);
    const prisma=new PrismaClient();

    // If there's no session, redirect to the homepage
    if (!session) {
        redirect('/');
    }
    const email = session.user.email
    const { id } = params;
    
    if (id) {  
        const person = await prisma.user.findUnique({
          where: { id },
          include:{
            followedBy: true,
            following: true
          }
        });
        if (person){
     
    
    return (
        <UserProfile
            profilePicUrl={person.image}
            name={person.name as string}
            email={session.user?.email as string}
            bio={person.bio as string} 
           
            interests={person.interests as string[]} 
            followers={person.followedBy.length}
            following={person.following.length}
            myProfile={person.email==email}
        />
    );
}
}
}
