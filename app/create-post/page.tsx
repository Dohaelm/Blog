import CreatePostForm from "@/components/CreatePostForm";
import {getServerSession} from "next-auth/next";
import {authOptions} from "../api/auth/[...nextauth]/route";
import {redirect} from 'next/navigation';
import {createPost} from '@/app/api/actions'
export default async function CreatePost(){
    const session = await getServerSession(authOptions);
    if(!session){
        redirect('/');
    }
    const email=session.user.email as string
    return <CreatePostForm userEmail={email } onSave={createPost}/>
}