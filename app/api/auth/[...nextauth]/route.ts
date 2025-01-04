import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials"
import FacebookProvider from "next-auth/providers/facebook"
import GoogleProvider from "next-auth/providers/google"
import {PrismaAdapter} from '@next-auth/prisma-adapter'
import { comparePassword, hashPassword } from "@/lib/password"
import prisma from "@/lib/prismadb"
import { signInSchema } from "@/lib/zod";



export const authOptions: AuthOptions={


    adapter: PrismaAdapter(prisma),
    providers:[   
    //   Credentials({
        
       
    //   credentials: {
       
    //     email: { },
    //     password: {  }
    //   },
        
    //   async authorize(credentials, req): Promise<{ interests: string[]; id: string; name: string | null; email: string | null; emailVerified: Date | null; password: string | null; image: string | null; bio: string | null; followers: number; following: number; createdAt: Date; updatedAt: Date; } | null>  {
        
    
    //   if (!credentials ) {
    //     return null;
    //   }
    //   const  {email,password}=credentials
        
    //     const user = await prisma.user.findUnique({
    //      where: { email }
    //     })

    //      if (user && await comparePassword(password, user.password as string)) {
    //      return{ ...user,
    //       interests: user.interests || []
    //      }
    //      } else {
    //       return null
    //     }
    //   },
    
   

    // }),
        GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret:process.env.GOOGLE_CLIENT_SECRET as string
    }),
    FacebookProvider({
        clientId:process.env.FACEBOOK_CLIENT_ID as string,
        clientSecret:process.env.FACEBOOK_CLIENT_SECRET as string
    }) ],
    
    pages:{
        signIn:"/"
      
    },
   session:{
    strategy:"jwt"
   },
   callbacks: {
    async signIn({ user}) {
      if (user.image && (user.image.startsWith('https://lh3.googleusercontent.com') || 
                         user.image.startsWith('https://platform-lookaside.fbsbx.com'))) {
        // Replace the profile picture with the default one
        await prisma.user.update({
          where: { id: user.id },
          data: {
            image: '/images/pdp.png', // Set the default profile picture
          },
        });
      }
      return true; // Proceed with sign-in
    },
    async jwt({ token, account,user }) {
      // If this is the first time the JWT callback is called, persist the access token
      if (user) {
       
        token.id = user.id;  // Store the user ID in the JWT token
     
      }
      
      if (account) {
        token.accessToken = account.access_token;
      }
     
      return token;
    },
    async session({ session, token }) {
      // Add the accessToken from the JWT to the session
      session.accessToken = token.accessToken as string;
      session.user.id = token.id as string;
      const notifications = await prisma.notification.findMany({
        where: {
          userId: token.id as string , // Get notifications for the logged-in user
          isRead: false, // Optionally filter for unread notifications
        },
        include: {
          actor: true,
           
        },
      });
  
      // Attach notifications to the session
      session.user.receivedNotifications = notifications;

      return session;
    },
  },

    secret: process.env.NEXTAUTH_SECRET 
      
   
};

const handler =     NextAuth(authOptions);

export{handler as GET, handler as POST};