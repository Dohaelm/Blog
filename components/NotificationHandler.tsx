// NotificationHandler.tsx
import { useSocket } from '@/Context/SocketContext';
import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { toast } from 'sonner';

const socket = useSocket() // Replace with your server URL

const NotificationHandler = () => {
  useEffect(() => {
    // Listen for new notifications
    const handleNewNotification = (notification : any) => {
      toast(notification.message, {
        duration: 3000,
        style: {
          background: '#333',
          color: '#fff',
        },
      });
    };
     if (socket){
        socket.on('newNotification', handleNewNotification);

        // Cleanup on unmount
        return () => {
          socket.off('newNotification', handleNewNotification);
        };

     }
   
  }, []); // Empty dependency array to ensure this runs once on mount

  return null; // This component doesn't need to render anything
};

export default NotificationHandler;
