'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react'; // Assuming you're using next-auth

const SocketContext = createContext<Socket | null>(null);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const { data: session } = useSession(); // Get the session

  useEffect(() => {
    // Only connect the socket if the user is logged in and session is available
    if (session?.user?.id) {
      console.log('Session User ID:', session.user.id);
      const socketInstance = io({
        query: { userId: session.user.id },
      });

      setSocket(socketInstance);

      // Cleanup on unmount
      return () => {
        socketInstance.disconnect();
      };
    }
  }, [session?.user?.id]); // Re-run when session changes

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};
