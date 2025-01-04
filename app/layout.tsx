

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NextAuthProvider } from "@/components/providers";
import AppWrapper from "@/components/AppWrapper";
import { SocketProvider } from "@/Context/SocketContext";



const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TOL -Think Out Loud",
  description: "Your thought's second safest place after your mind",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <NextAuthProvider>
        <SocketProvider>
      <body className={inter.className} style={{fontFamily:"AU VIC WA NT Hand"}}>
      <AppWrapper>
      {children}
      </AppWrapper>
      
      </body>
      </SocketProvider>
        
      </NextAuthProvider>
    </html>
   
  );
}
