"use client"; // This ensures that this component runs on the client side

import React from 'react';

interface UserProfileProps {
  profilePicUrl?: string | null;
  name: string;
  email: string;
  bio: string;
  interests: string[];
  followers: number;
  following: number;
  myProfile: boolean
}

const UserProfile: React.FC<UserProfileProps> = ({
  profilePicUrl,
  name,
  email,
  bio,
  interests,
  followers,
  following,
  myProfile
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4 relative">
      {myProfile && <div className="absolute top-4 right-4 group mt-16 mr-10">
    <a href="/edit-profile" className="relative ">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="h-6 w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
        />
      </svg>
    </a>
    
    <span className="absolute w-20 top-8 right-0 text-center bg-white text-gray-800 text-xs py-1 px-1 rounded opacity-0 group-hover:opacity-90 transition-opacity">
  Edit Profile
</span>
  </div>}
  

  <div className="w-full max-w-2xl flex flex-col items-center">
    <div className="h-64 w-64 rounded-full overflow-hidden border-4 border-gray-300 mb-8">
      <img
        src={profilePicUrl || '/images/default-profile.png'}
        alt={`${name}'s profile`}
        className="object-cover w-full h-full"
      />
    </div>

    <div className="text-center">
      <h2 className="text-4xl font-semibold mb-4">{name}</h2>
      <p className="hidden">{email}</p>
      <p className="text-lg text-gray-300 mb-6 max-w-lg">{bio}</p>
      <div className="flex justify-center gap-10 mb-6">
        <div className="text-center">
          <h4 className="text-2xl font-semibold">{followers}</h4>
          <p className="text-gray-400">Followers</p>
        </div>
        <div className="text-center">
          <h4 className="text-2xl font-semibold">{following}</h4>
          <p className="text-gray-400">Following</p>
        </div>
      </div>
      <div className="text-center">
        <h3 className="text-2xl font-medium text-gray-300 mb-4">Interests:</h3>
        <ul className="flex flex-wrap justify-center gap-2">
          {interests && interests.length > 0 ? (
            interests.map((interest, index) => (
              <li key={index} className="bg-red-800 text-gray-200 py-2 px-4 rounded-full">
                {interest}
              </li>
            ))
          ) : (
            <li className="text-gray-500">No interests listed</li>
          )}
        </ul>
      </div>
    </div>
  </div>
</div>

  );
};

export default UserProfile;
