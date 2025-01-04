'use client';

import SignInBtns from './SigninBtns';
import styles from './SignInModal.module.css';

interface SignInModalProps {
  toggleModal: (type: 'signIn' | null) => void;
}

export default function SignInModal({ toggleModal }: SignInModalProps) {
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <span className={styles.close} onClick={() => toggleModal(null)}>&times;</span>
        <div className={styles.modalCenterI}>
        <SignInBtns />
        
        </div>
       
        
      
        <div className='text-center mt-20 text-base'>
          
          </div>
        </div>
        
      </div>
 
  );
}
