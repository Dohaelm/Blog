'use client';



import { useState, FormEvent } from 'react';
import { FacebookLoginButton, GoogleLoginButton } from 'react-social-login-buttons';
import { Button } from "@/components/ui/button";
import {CreateUser} from "@/app/api/auth/signup";
import { useFormState } from 'react-dom';





export default function SignUpBtns() {
  
  const [formState, action]= useFormState(CreateUser,{message:''});

 
  
  

  return (
    <div>
      <div>
        <h1 className="text-center -mt-19 text-2xl font-bold text-gray-700">Join the Think Out Loud community!</h1>
        <form className="space-y-6" action={action}>
          <div className="flex flex-col space-y-1">
            <label htmlFor="name" className="text-gray-600 ">Username</label>
            <input
              type="text"
              name="name"
              className="p-2 border border-gray-300 rounded -mt-5"
             
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="email" className="text-gray-600 -mt-5">Email</label>
            <input
              type="text"
              name="email"
              className="p-2 border border-gray-300 rounded -mt-5"
              
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="password" className="text-gray-600 -mt-5">Password</label>
            <input
              type="password"
              name="password"
              className="p-2 border border-gray-300 rounded -mt-5"
            
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="confirmPassword" className="text-gray-600 -mt-5">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              className="p-2 border border-gray-300 rounded -mt-5"
              
            />
          </div>
          {formState.message?
          <div className={formState.message === 'User Successfully registered, sign in now' ? 'my-2 p-2 bg-green-200 border rounded border-green-400 -mt-15' : 'my-2 p-2 bg-red-200 border rounded border-red-400 -mt-15'}>
  {formState.message}
</div>
:null}

          <div className="flex flex-col space-y-1">
            <Button variant={'custom' } type='submit'>Sign Up</Button>
          </div>
          <div className="text-center text-gray-500">Or</div>
          <div className="flex flex-col space-y-1">
            <div>
              <FacebookLoginButton className="w-full " style={{ fontFamily: 'Edu AU VIC WA NT Hand', fontSize: '16px', borderRadius: '8px', width: 'calc(100% - 6px)' }} />
            </div>
            <div>
              <GoogleLoginButton className="w-full" style={{ fontFamily: 'Edu AU VIC WA NT Hand', fontSize: '16px', borderRadius: '8px', width: 'calc(100% - 6px)' }} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
