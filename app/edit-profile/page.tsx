// app/edit-profile/page.tsx
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]/route';
import EditProfileForm from '@/components/EditProfileForm';
import {Save} from '@/app/api/actions'
import { PrismaClient } from '@prisma/client';

const EditProfilePage = async () => {
  const session = await getServerSession(authOptions);
  const prisma=new PrismaClient();

  if (!session) {
    return <p>You need to be authenticated to edit your profile.</p>;
  }
  const email = session.user.email
  if (email) {  // This ensures email is a non-null, non-undefined string
      const person = await prisma.user.findUnique({
        where: { email },
      });
      if (person){
   

  return (
    <EditProfileForm 
    email={session.user?.email as string}
      currentName={person.name || ""}
      currentInterests={person.interests || []}
      currentProfilePicUrl={person.image || null}
      currentBio={person.bio || ""}
      onSave={Save}
     
    />
  );}
}
};

export default EditProfilePage;
