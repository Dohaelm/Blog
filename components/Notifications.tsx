import React from 'react';
import Image from 'next/image';

interface Notification {
  id: string;
  actor: {
    name: string | null;
    image: string ; // URL of the actor's profile picture
  };
  message: string;
  isRead: boolean;
  createdAt: Date;
}

interface NotificationProps {
  notifications: Notification[];
}

const NotificationComponent: React.FC<NotificationProps> = ({ notifications }) => {
  return (
    <div className="min-h-screen bg-gray-800 text-white p-6">
      <h1 className="text-2xl font-bold mb-6">Notifications</h1>
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`flex items-center p-4 rounded-lg shadow-md ${
              notification.isRead ? 'bg-gray-300' : 'bg-gray-300 border-l-4 border-red-800'
            }`}
          >
            {/* Actor's profile picture */}
            <div className="w-12 h-12 mr-4">
              <Image
                src={notification.actor.image}
                alt={`${notification.actor.name}'s profile picture`}
                className="rounded-full"
                width={48}
                height={48}
              />
            </div>
            
            {/* Notification message */}
            <div>
              <p className="font-semibold text-black">{notification.actor.name}</p>
              <p className="text-gray-800">{notification.message}</p>
            </div>

            {/* Time (optional) */}
            <div className="ml-auto text-gray-500 text-sm">
              {new Date(notification.createdAt).toLocaleDateString('en-US', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  
})}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationComponent;
