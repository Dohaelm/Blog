// app/dashboard/page.tsx
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from 'next/navigation';
import { PrismaClient } from "@prisma/client";
import Link from 'next/link';
import Dashboard from "@/components/dashboard"; 

export default async function DashboardPage() {
  const prisma = new PrismaClient();
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/');
  } else {
    const email = session.user.email as string;
    const user = await prisma.user.findUnique({ where: { email } });
    
    if (user) {
      const interests = user.interests;
      const followedUserIds = await prisma.follow.findMany({
        where: {
          followerId: user.id, 
        },
        select: {
          followingId: true, 
        },
      });
      
      const followingIds = followedUserIds.map(follow => follow.followingId); // Extract the IDs into an array
      
      const posts = await prisma.post.findMany({
        where: {
          OR: [
            { topic: { in: interests } }, // Posts matching the user's interests
            { userId: { in: followingIds } } // Posts from users they follow
          ],
        },
      });

      return(
        <Dashboard   posts={posts} />
      )
    }
  }
}

