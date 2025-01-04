'use client';
import React, { useState } from 'react';
import Image from "next/image";
import { Link } from 'react-scroll';
import { useSession, signOut } from "next-auth/react";


interface NavbarProps {
  toggleModal: (type: 'signIn' ) => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleModal }) => {
  const { status, data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const userId= session?.user.id
const receivedNotifications= session?.user.receivedNotifications
  return (
    <nav className="bg-gray-800 p-4 fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center relative">
        <button className="text-white text-2xl hover:border-b-2 hover:border-red-800">
          <a href={'/'}>Think Out Loud</a>
        </button>
      
        {status === 'authenticated' ? (
          <div className="space-x-6 absolute z-30 right-0 flex items-center">
             <a href="/notifications" className='text-white mr-11'> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
</svg>

        { receivedNotifications && receivedNotifications.length > 0 && (
          <span className="badge">{receivedNotifications.length}</span>
        )}</a>
            <div className="relative">
           
              <Image 
                src={session?.user?.image || ""} 
                width={36} height={36} 
                alt="Profile Image"
                className='rounded-full cursor-pointer'
                onClick={toggleMenu}
                onMouseEnter={toggleMenu}
              />
              {menuOpen && (
                <div 
                  className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2"
                  onMouseLeave={() => setMenuOpen(false)}
                >
                 
                  <a 
                    href="/create-post" 
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Create new post
                  </a>
                  <a 
                    href={`/profile/${userId}`}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                   Profile
                  </a>
                  <button 
                    onClick={() =>  signOut() } 
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Sign out 
                  </button>
                </div>

              )}
            </div>
           
           
          </div>
        ) : (
          <div className="space-x-6">
            <button className="text-white text-lg hover:border-b-2 hover:border-red-800">
              <Link 
                to="about-us"
                smooth={true}
                offset={60}
                duration={500}
              >
                About us
              </Link>
            </button>
            
            <button
              onClick={() => toggleModal('signIn')}
              className="text-white text-lg hover:border-b-2 hover:border-red-800"
            >
              Sign In
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
