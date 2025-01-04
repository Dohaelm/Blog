'use server'
import { PrismaClient } from '@prisma/client';
import { hashPassword } from '@/lib/password';
import { signInSchema } from '@/lib/zod';
import { redirect } from 'next/navigation';
import { ZodError } from 'zod';
import { transformZodErrors } from '@/lib/transformZodErrors';

const prisma=new PrismaClient();
 
export  async function CreateUser(formState: {message: string} , formData: FormData){
    try{
      const name= formData.get('name') as string;
      const email = formData.get('email') as string;
      const password=formData.get('password') as string;
      const confirmPassword=formData.get('confirmPassword') as string;
      if (password!=confirmPassword){
        return {message:"Passwords do not match"}
      }
     const user=  signInSchema.parse({name,email,password});

      

        const existingUser = await prisma.user.findUnique({ where: { email } });

        if (existingUser) {
          return { message: 'User already exists' };
          }


        const hashedPassword = await hashPassword(user.password);
        const newUser = await prisma.user.create({
            data: {name: user.name,
               
              email: user.email,
              password: hashedPassword,
              interests : [],
              image: '/images/pdp.png',
              followers : 0,
              following: 0
             
            },
          });
         return{
          message:'User Successfully registered, sign in now'
         }
      
          
        
      }
     
   catch(err : unknown){
    if (err instanceof ZodError) {
      const formattedErrors = transformZodErrors(err)
        return {
            message : formattedErrors 

        };
    }else {
        return {
            message : 'Something went wrong'
        }
    }

   }
   


}
    
    
