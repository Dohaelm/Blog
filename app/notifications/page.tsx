import {getServerSession} from "next-auth/next";
import {authOptions} from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import NotificationComponent from "@/components/Notifications";
import { PrismaClient } from "@prisma/client";


export default async function NotificationPage(){
    const session = await getServerSession(authOptions);
    if(!session){
        redirect('/');
    }
    else {
        const prisma = new PrismaClient()
        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
            include: {
              receivedNotifications: {
                include: {
                  actor: true,  // Includes the actor details in the notification
                },
                orderBy: {
                    createdAt: 'desc',  // Orders notifications by createdAt in descending order (most recent first)
                  },
              },
            },
          });
        const notifications = user?.receivedNotifications
        return (
            <NotificationComponent notifications={notifications || []} />
        )
    }

}