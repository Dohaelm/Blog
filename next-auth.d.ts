// next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { Notification } from "@prisma/client";
declare module "next-auth" {
  interface Session {
    accessToken?: string; 
    user: {
      id: string,
      name: string,
      bio?: string | null;
     
    receivedNotifications?:Notification []

      interests?: string[] | undefined; // Add interests here
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
   
    name:string,

    bio?: string | null;
    interests?: string[] | undefined;
    receivedNotifications?:Notification [] // Add interests here
  }
}
