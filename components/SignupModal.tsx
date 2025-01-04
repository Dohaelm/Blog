'use client';

import SignUpBtns from './SignupBtns';
import styles from './SignInModal.module.css';

interface SignUpModalProps {
  toggleModal: (type: 'signIn' | 'signUp' | null) => void;
}

export default function SignUpModal({ toggleModal }: SignUpModalProps) {
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
       <span className={styles.close} onClick={() => toggleModal(null)}>&times;</span>
       
        <div className={styles.modalCenter}>
        <SignUpBtns />

        </div>
        <div className='text-center mt-7 text-base'>
        
       Already have an account? <button
            onClick={() => toggleModal('signIn')}
            className="text-black hover:text-red-800"
          >
           Sign In
          </button> 
          </div>
      </div>
    </div>
  );
}
