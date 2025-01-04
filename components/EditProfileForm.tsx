'use client';

import { useState } from 'react';
import { CldUploadButton, CloudinaryUploadWidgetResults } from 'next-cloudinary';
import { FaCamera } from 'react-icons/fa';
import { useFormState } from 'react-dom';
import { useRouter } from 'next/navigation';
import { Save } from '@/app/api/actions';
import { toast } from 'sonner';


interface EditProfileFormProps {
  email: string;
  currentName: string;
  currentInterests: string[];
  currentProfilePicUrl: string | null;
  currentBio: string| "";
  onSave: (formState: { message: string }, formData: FormData) => Promise< {message: string}>;
}

const interestsOptions = [
  'philosophy',
  'music',
  'traveling',
  'cuisine',
  'fashion',
  'science',
];

const EditProfileForm = ({
  email,
  currentName,
  currentInterests,
  currentProfilePicUrl,
  currentBio,
  onSave,
}: EditProfileFormProps) => {
  const [name, setName] = useState(currentName);
  const [selectedInterests, setSelectedInterests] = useState<string[]>(currentInterests);
  const [profilePicUrl, setProfilePicUrl] = useState(currentProfilePicUrl);
  const [bio, setBio]=useState(currentBio || "")
 
  const [formState, setFormState] = useState<{ message: string }>({ message: '' });
  const router = useRouter();

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedInterests((prev) => [...prev, value]);
    } else {
      setSelectedInterests((prev) => prev.filter((interest) => interest !== value));
    }
  };

  const handleUpload = (result: CloudinaryUploadWidgetResults) => {
    const info = result.info as object;
    if ('secure_url' in info) {
      setProfilePicUrl(info.secure_url as string);
    }
  };

   const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();

    const formData = new FormData();
     formData.append('email', email);
     formData.append('name', name);
     formData.append('bio', bio);
    selectedInterests.forEach((interest) => formData.append('interest', interest));
    formData.append('profilePicUrl', profilePicUrl || '');

   
    
    const result =await onSave(formState, formData);
    setFormState(result);
    console.log(result.message)

    
    if (result.message === 'Modifications have been successfully applied.') {
      toast.success(result.message)
      router.push('/profile');
    }
    else if (result.message==="Name should at least contain 2 characters."){
      toast.warning(result.message)
    }


    
   };

  return (
    
    <div className="min-h-screen w-full bg-black flex items-center justify-center ">
      <form className="max-w-3xl w-full p-10 bg-black rounded-lg shadow-lg mt-32" onSubmit={handleSubmit}>
        <input type="hidden" id="email" name="email" value={email} />

        <div className="flex flex-col items-center mb-10">
          <div className="relative group">
            <img
              src={profilePicUrl || '/default-profile.png'}
              alt="Profile Picture"
              className="w-40 h-40 rounded-full border-4 border-gray-600 object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              <CldUploadButton uploadPreset="uwuyaff0" onSuccess={handleUpload} className="flex items-center justify-center text-white">
                <FaCamera className="text-white text-2xl mr-2" />
                Change Profile Picture
              </CldUploadButton>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <label htmlFor="name" className="block text-white font-medium mb-2">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="w-full p-4 bg-gray-700 border border-gray-600 rounded text-white"
          />
        </div>
        <div className="mb-8">
          <label htmlFor="bio" className="block text-white font-medium mb-2">Biography</label>
          <input
            id="bio"
            name="bio"
            type="text"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Biography"
            className="w-full p-4 bg-gray-700 border border-gray-600 rounded text-white"
          />
        </div>

        <div className="mb-8">
          <label className="block text-white font-medium mb-2">Interests</label>
          <div className="grid grid-cols-2 gap-4">
            {interestsOptions.map((interest) => (
              <label key={interest} className="flex items-center text-white">
                <input
                  type="checkbox"
                  value={interest}
                  checked={selectedInterests.includes(interest)}
                  onChange={handleCheckboxChange}
                  className="mr-2 accent-red-800"
                />
                {interest}
              </label>
            ))}
          </div>
        </div>
         
        <button type="submit" className="w-full bg-red-800 text-white font-medium py-4 rounded hover:bg-red-700">
          Save
        </button>
        {/* {formState.message && <p className='text-gray-100'>{formState.message}</p>} */}
      </form>
    </div>
  );}

export default EditProfileForm;
