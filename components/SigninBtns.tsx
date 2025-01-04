'use client';

import { FacebookLoginButton, GoogleLoginButton } from 'react-social-login-buttons';
import { Button } from "@/components/ui/button";
import { signIn } from 'next-auth/react';
import { useState, FormEvent } from 'react';

export default function SignInBtns() {


 


  return (
    <div>
      <div>
        <h1 className="text-center mb-6 text-2xl font-bold text-gray-700 ">The moment to Think Out Loud!</h1>
        <form className="space-y-6" >
          {/* <div className="flex flex-col space-y-2"> */}
            {/* <label htmlFor="email" className="text-gray-600">Email</label>
            <input
              type="text"
              name="email"
              className="p-2 border border-gray-300 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="password" className="text-gray-600">Password</label>
            <input
              type="password"
              name="password"
              className="p-2 border border-gray-300 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <div className="text-red-500">{error}</div>}
          <div className="flex flex-col space-y-4">
            <Button variant={'custom'} type='submit' className='mt-5 text-base'>Log in</Button>
          </div> */}
          {/* <div className="text-center text-gray-500" >Or</div> */}
          <div className="flex flex-col space-y-4">
            <div className='mt-7'>
              <FacebookLoginButton onClick={() => signIn('facebook')} className="w-full" style={{ fontFamily: 'Edu AU VIC WA NT Hand', fontSize: '16px', borderRadius: '8px', width: 'calc(100% - 6px)' }} />
            </div>
            <div>
              <GoogleLoginButton onClick={() => signIn('google')} className="w-full" style={{ fontFamily: 'Edu AU VIC WA NT Hand', fontSize: '16px', borderRadius: '8px', width: 'calc(100% - 6px)' }} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
