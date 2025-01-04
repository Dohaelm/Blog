'use client'
import Link from 'next/link';
import { useEffect, useState } from "react";
import {useSocket} from '@/Context/SocketContext'
import { io } from 'socket.io-client';
import { useSession } from "next-auth/react";



interface Post
 {
    postId: string;
    userId: string;
    title: string;
    image: string;
    topic: string;
    body: string;
    createdAt: Date;
    updatedAt: Date;
}
interface DashboardProps {
    posts: Post[];
  }
  
export default function Dashboard({ posts }: DashboardProps){
  const socket = useSocket(); 
 
  useEffect(() => {
    if (socket){
    socket.on('response', (data) => {
      console.log('Response from server:', data);
    });
    return () => {
      socket.off('response');
    };
  }},
    [socket]);

  const sendMessage = () => {
    if(socket){
    // Emit a 'message' event to the server
    socket.emit('message', 'Hello from the client!');
  }};
    if (posts.length > 0) {
        return (
            
          <div className="min-h-screen bg-black p-6 flex justify-center items-start mt-16">
            <div className="max-w-4xl w-full">
              <h1 className="text-white text-3xl font-semibold mb-8 text-center">Dashboard</h1>
              <div className='text-white'>

    </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <PostCard key={post.postId} post={post} />
                ))}
              </div>
            </div>
            <div  className='text-white'>
    
    </div>
          </div>
        );
      } else {
        return (
          <div className="min-h-screen bg-black p-6 flex justify-center items-center">
            <p className="text-white text-xl">No available posts</p>
            <div  className='text-white'>
   
    </div>
          </div>
        );
      }
    }
 


// Update PostCard component to accept a 'post' prop
interface Post {
  postId: string;
  userId: string;
  title: string;
  image: string;
  topic: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
}

function PostCard({ post }: { post: Post }) {
  const wordLimit = 20; // Set your desired word limit

  const truncateText = (text: string | undefined, limit: number) => {
    if (!text) return ''; // Return an empty string if text is undefined
    const words = text.split(' ');
    if (words.length > limit) {
      return `${words.slice(0, limit).join(' ')}...`;
    }
    return text;
  };

  const isReadMoreVisible = post.body && post.body.split(' ').length > wordLimit;

  return (
    <div
      className="bg-gray-800 rounded-lg shadow-md p-6 flex flex-col items-start relative"
    >
      {post.image && (
        <img
          src={post.image}
          alt="Post Image"
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
      )}
      <h2 className="text-white text-2xl font-semibold mb-2"><a href={`/post/${post.postId}`}>{post.title}</a></h2>
      <p className="text-gray-300 mb-4">
        {truncateText(post.body, wordLimit)}
      </p>
      {isReadMoreVisible && (
        <Link
          href={`/post/${post.postId}`}  // Dynamic route to the post page
          className="text-red-500 hover:underline"
        >
          Read More
        </Link>
      )}
    </div>
  );

   
}



// app/dashboard/page.tsx




   
    

   







