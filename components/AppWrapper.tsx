'use client';

import React, { ReactNode, useState } from 'react';
import Navbar from './navbar'; 
import SignInModal from './SigninModal';
import SignUpModal from './SignupModal';
import LoadingPage from './LoadingPage';
import { useSession } from 'next-auth/react';

import { Toaster, toast } from 'sonner';
import NotificationHandler from './NotificationHandler';
type Props = {
    children: React.ReactNode
 }
const AppWrapper: React.FC<Props> = ({children}) => {
    type ModalType = 'signIn' | 'signUp' | null;
    const [modalType, setModalType] = useState<ModalType>(null);

  const toggleModal = (type: ModalType) => {
    setModalType(type);
  };

  const closeModal = () => {
    setModalType(null);
  };

  const { data: session, status } = useSession();

  if (status === 'loading') {
    // Show a loading spinner or nothing while session is being determined
    return <LoadingPage/>;
  }
  

  return (
    <div>
      <Navbar toggleModal={toggleModal} />
      <div className="body-wrapper">
        {children}
      </div>
       
      {modalType === 'signIn' && <SignInModal toggleModal={toggleModal} />}
      {modalType === 'signUp' && <SignUpModal toggleModal={toggleModal} />}
      <Toaster position="top-center" richColors/>
     
    </div>
   
  );
};

export default AppWrapper;
