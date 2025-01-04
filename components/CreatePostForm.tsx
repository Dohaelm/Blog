'use client';

import { useState } from 'react';
import { CldUploadButton, CloudinaryUploadWidgetResults } from 'next-cloudinary';
import { FaCamera, FaTimes } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface CreatePostFormProps {
  userEmail: string;
  onSave: (formState: { message: string }, formData: FormData) => Promise<{ message: string }>;
}

const topicOptions = [
  'philosophy',
  'music',
  'traveling',
  'cuisine',
  'fashion',
  'science',
];

const CreatePostForm = ({ userEmail, onSave }: CreatePostFormProps) => {
  const [title, setTitle] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [publicId, setPublicId] = useState<string>('');
  const [body, setBody] = useState('');
  const [formState, setFormState] = useState<{ message: string }>({ message: '' });
  const router = useRouter();

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedTopic(value); // Only allow one topic
    } else {
      setSelectedTopic(''); // Clear the topic if unchecked
    }
  };

  const removeImage = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/removeImage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ publicId }),
      });
      if (res.ok) {
        setImage("");
        setPublicId("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpload = (result: CloudinaryUploadWidgetResults) => {
    const info = result.info as object;
    if ('secure_url' in info && 'public_id' in info) {
      setImage(info.secure_url as string);
      setPublicId(info.public_id as string);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('userEmail', userEmail);
    formData.append('postTitle', title);
    formData.append('topic', selectedTopic);
    formData.append('postBody', body);
    formData.append('postImage', image);
    

    const result = await onSave(formState, formData);
    setFormState(result);
    console.log(formData.get('postTitle'),formData.get('topic'),formData.get('userId'))

    if (result.message === 'Post successfully uploaded.') {
      toast.success(result.message);
      router.push('/profile');
    } else if (result.message) {
      toast.error(result.message);
    }
  };

  return (
    <div className="min-h-screen w-full bg-black flex items-center justify-center">
      <form className="max-w-3xl w-full p-10 bg-black rounded-lg shadow-lg mt-16" onSubmit={handleSubmit}>
        <input type="hidden" id="userEmail" name="userEmail" value={userEmail} />

        <div className="mb-8">
          <label htmlFor="title" className="block text-white font-medium mb-2">Title</label>
          <input
            id="title"
            name="postTitle"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full p-4 bg-gray-700 border border-gray-600 rounded text-white"
          />
        </div>

        <div className="mb-8">
          <label htmlFor="body" className="block text-white font-medium mb-2">Body</label>
          <textarea
            id="body"
            name="postBody"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Body"
            className="w-full p-4 bg-gray-700 border border-gray-600 rounded text-white h-60"
          />
        </div>

        <div className="mb-8">
          <label className="block text-white font-medium mb-2">Topic</label>
          <div className="grid grid-cols-2 gap-4">
            {topicOptions.map((topic) => (
              <label key={topic} className="flex items-center text-white">
                <input
                  type="checkbox"
                  value={topic}
                  checked={selectedTopic === topic} // Only one topic should be checked
                  onChange={handleCheckboxChange}
                  className="mr-2 accent-red-800"
                />
                {topic}
              </label>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <label className="block text-white font-medium mb-2">Image</label>
          {image && (
            <div className="relative mb-4">
              <img
                src={image}
                alt="Post Image"
                className="w-full h-80 rounded-lg border-4 border-gray-600 object-cover"
              />
              <button
                onClick={removeImage}
                className="absolute top-2 right-2 p-1 bg-white bg-opacity-30 rounded-full text-white hover:bg-opacity-50 transition-opacity"
                aria-label="Remove image"
              >
                <FaTimes className="text-2xl" />
              </button>
            </div>
          )}
          <div className="flex justify-center">
            <CldUploadButton uploadPreset="uwuyaff0" onSuccess={handleUpload} className="flex items-center justify-center text-white bg-red-800 hover:bg-red-700 py-2 px-4 rounded">
              <FaCamera className="text-white text-2xl mr-2" />
              Upload an image
            </CldUploadButton>
          </div>
        </div>

        <button type="submit" className="w-full bg-red-800 text-white font-medium py-4 rounded hover:bg-red-700">
          Save
        </button>
      </form>
    </div>
  );
};

export default CreatePostForm;
