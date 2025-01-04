'use client';
import { useState, useEffect } from 'react';

import Head from 'next/head';
import Navbar from '@/components/navbar';
import SignInModal from '@/components/SigninModal';

import CustomCarousel from '@/components/CustomCarousel';
import {AnimatePresence, motion} from 'framer-motion';
import { Button } from '@/components/ui/button';

type ModalType = 'signIn' | null;

export default function HomePage() {
 
  const [modalType, setModalType] = useState<ModalType>(null);

  const toggleModal = (type: ModalType) => {
    setModalType(type);
  };

  const closeModal = () => {
    setModalType(null);
  };
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    
    <div className="custom-slide flex justify-between w-auto h-1/2 mb-52 mt-20 space-x-3 ">
      <AnimatePresence>
<motion.div
  className="image-container w-1/5 relative top-20 mr-3 ml-3"
  
  initial={{ x: 300, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  exit={{ opacity: 0 }}
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
  transition={{
    x: { type: "spring", stiffness: 20, damping: 7 },
     opacity: { duration: 1 }
  }}
>
<img src="/images/cuisine.jpg" alt="cuisine" className=" object-cover  w-full h-full   " />
 </motion.div>
</AnimatePresence>
      
  
  <AnimatePresence>
<motion.div
  className="image-container w-1/5 relative top-0 mr-3 ml-3"
  
  initial={{ x: 300, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  exit={{ opacity: 0 }}
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
  transition={{
    x: { type: "spring", stiffness: 20, damping: 7 },
     opacity: { duration: 1 }
  }}
>
<img src="/images/cuisine2.jpg" alt="cuisine" className=" object-cover  w-full h-full  " />
 </motion.div>
</AnimatePresence>
     
<AnimatePresence>
<motion.div
  className="image-container w-1/5 relative top-20 ml-3 mr-3 "
  
  initial={{ x: 300, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  exit={{ opacity: 0 }}
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
  transition={{
    x: { type: "spring", stiffness: 20, damping: 7 },
     opacity: { duration: 1 , ease:"easeInOut" }
  }}
>
<img src="/images/cuisine3.jpg" alt="cuisine" className=" object-cover  w-full h-full  " />
 </motion.div>
</AnimatePresence>
     
      <AnimatePresence>
<motion.div
  className="image-container w-1/5 relative top-0 ml-3 mr-3 "
  
  initial={{ x: 300, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  exit={{ opacity: 0 }}
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
  transition={{
    x: { type: "spring", stiffness: 20, damping: 7 },
     opacity: { duration: 1 }
  }}
>
<img src="/images/cuisine4.jpg" alt="cuisine" className=" object-cover  w-full h-full  " />
 </motion.div>
</AnimatePresence>
    
      <AnimatePresence>
<motion.div
  className="image-container w-1/5 relative top-20  ml-3 mr-3 "
  
  initial={{ x: 300, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  exit={{ opacity: 0 }}
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
  transition={{
    x: { type: "spring", stiffness: 20, damping: 7 },
     opacity: { duration: 1 }
  }}
>
<img src="/images/cuisine5.jpg" alt="cuisine" className=" object-cover  w-full h-full  " />
 </motion.div>
</AnimatePresence>

    </div>,
    <div className="custom-slide flex justify-between w-auto h-1/2 mb-52 mt-20 space-x-3 ">
   <AnimatePresence>
<motion.div
  className="image-container w-1/5 relative top-20 ml-3 mr-3 "
  
  initial={{ x: 300, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  exit={{ opacity: 0 }}
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
  transition={{
    x: { type: "spring", stiffness: 20, damping: 7 },
     opacity: { duration: 1 }
  }}
>
<img src="/images/travel.jpg" alt="travel" className=" object-cover  w-full h-full  " />
 </motion.div>
</AnimatePresence>
   
    <AnimatePresence>
<motion.div
  className="image-container w-1/5 relative top-0 ml-3 mr-3 "
  
  initial={{ x: 300, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  exit={{ opacity: 0 }}
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
  transition={{
    x: { type: "spring", stiffness: 20, damping: 7 },
     opacity: { duration: 1 }
  }}
>
<img src="/images/travel2.jpg" alt="travel" className=" object-cover  w-full h-full  " />
 </motion.div>
</AnimatePresence>
   

   <AnimatePresence>
<motion.div
  className="image-container w-1/5 relative top-20 ml-3 mr-3 "
  
  initial={{ x: 300, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  exit={{ opacity: 0 }}
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
  transition={{
    x: { type: "spring", stiffness: 20, damping: 7 },
     opacity: { duration: 1 }
  }}
>
<img src="/images/travel3.jpg" alt="cuisine" className=" object-cover  w-full h-full  " />
 </motion.div>
</AnimatePresence>
   <AnimatePresence>
<motion.div
  className="image-container w-1/5 relative top-0 ml-3 mr-3 "
  
  initial={{ x: 300, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  exit={{ opacity: 0 }}
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
  transition={{
    x: { type: "spring", stiffness: 20, damping: 7 },
     opacity: { duration: 1 }
  }}
>
<img src="/images/travel4.jpg" alt="travel" className=" object-cover  w-full h-full  " />
 </motion.div>
</AnimatePresence>
    <AnimatePresence>
<motion.div
  className="image-container w-1/5 relative top-20 ml-3 mr-3 "
  
  initial={{ x: 300, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  exit={{ opacity: 0 }}
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
  transition={{
    x: { type: "spring", stiffness: 20, damping: 7 },
     opacity: { duration: 1 }
  }}
>
<img src="/images/travel5.jpg" alt="travel" className=" object-cover  w-full h-full  " />
 </motion.div>
</AnimatePresence>
  </div>,
    <div className="custom-slide flex justify-between w-auto h-1/2 mb-52 mt-20 space-x-3 ">
   <AnimatePresence>
<motion.div
  className="image-container w-1/5 relative top-20 mr-3 ml-3 "
  
  initial={{ x: 300, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  exit={{ opacity: 0 }}
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
  transition={{
    x: { type: "spring", stiffness: 20, damping: 7 },
     opacity: { duration: 1 }
  }}
>
<img src="/images/fashion3.jpg" alt="fashion" className=" object-cover  w-full h-full  " />
 </motion.div>
</AnimatePresence>
   
   <AnimatePresence>
<motion.div
  className="image-container w-1/5 relative top-0 mr-3 ml-3"
  
  initial={{ x: 300, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  exit={{ opacity: 0 }}
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
  transition={{
    x: { type: "spring", stiffness: 20, damping: 7 },
     opacity: { duration: 1 }
  }}
>
<img src="/images/fashion2.jpg" alt="fashion" className=" object-cover  w-full h-full  " />
 </motion.div>
</AnimatePresence>
   

   <AnimatePresence>
<motion.div
  className="image-container w-1/5 relative top-20 mr-3 ml-3"
  
  initial={{ x: 300, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  exit={{ opacity: 0 }}
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
  transition={{
    x: { type: "spring", stiffness: 20, damping: 7 },
     opacity: { duration: 1 }
  }}
>
<img src="/images/fashion.jpg" alt="fashion" className=" object-cover  w-full h-full  " />
 </motion.div>
</AnimatePresence>
    <AnimatePresence>
<motion.div
  className="image-container w-1/5 relative top-0 mr-3 ml-3 "
  
  initial={{ x: 300, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  exit={{ opacity: 0 }}
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
  transition={{
    x: { type: "spring", stiffness: 20, damping: 7 },
     opacity: { duration: 1 }
  }}
>
<img src="/images/fashion4.jpg" alt="fashion" className=" object-cover  w-full h-full  " />
 </motion.div>
</AnimatePresence>
   <AnimatePresence>
<motion.div
  className="image-container w-1/5 relative top-20 mr-3 ml-3"
  
  initial={{ x: 300, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  exit={{ opacity: 0 }}
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
  transition={{
    x: { type: "spring", stiffness: 20, damping: 7 },
     opacity: { duration: 1 }
  }}
>
<img src="/images/fashion5.jpg" alt="fashion" className=" object-cover  w-full h-full  " />
 </motion.div>
</AnimatePresence>
  </div>,
  ];

  const topics = ['Cuisine', 'Vacation', 'Fashion'];


  return (
    <div>
      <Head>
        <title>Think Out Loud Blog</title>
      </Head>
     
      <main>
      

        <section className='one '>
        <div className="text-center mb-8 ">
          <h1 className=' pt-32 mb-5 text-2xl font-semibold text-animation'>Let's Talk</h1>
          <motion.h2
            className='text-6xl font-bold text-red-900'
            key={currentSlide}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            {` ${topics[currentSlide % topics.length]}`}
          </motion.h2>
        </div>
          <div  className=' flex justify-center items-center mb-10 -mt-12' >
          <div className='h-1/3 w-10/12  '>
          <CustomCarousel slides={slides} onSlideChange={setCurrentSlide} />
          </div>
          </div>
           </section>
           <section className="py-16 px-8 bg-gray-100 text-gray-900 -mt-10" id="about-us">
  <div className="max-w-7xl mx-auto">
    <h3 className="text-3xl font-bold mb-8 text-center ">Why Think Out Loud?</h3>
    <div className="flex flex-wrap justify-center gap-8">
    
      <div className="w-full md:w-1/4 p-4">
        <div className="bg-white p-6 rounded-lg shadow-lg transform transition duration-1000 hover:scale-110">
          <div className='flex justify-center items-center'>
          <img src="/images/brain.png" alt="Brain" className=" h-48 object-cover mb-4"/>
          </div>
          <h3 className="text-2xl font-bold mb-2">Creative Thinking</h3>
          <p className="text-base">
            Engage your mind with creative and critical thinking. Think Out Loud encourages you to explore and share innovative ideas.
          </p>
        </div>
      </div>

   
      <div className="w-full md:w-1/4 p-4 transform transition duration-1000 hover:scale-110">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <img src="/images/handshake.png" alt="Handshake" className="w-full h-48 object-cover mb-4"/>
          <h3 className="text-2xl font-bold mb-2">Connect & Collaborate</h3>
          <p className="text-base">
            Build connections and collaborate with others. Our platform fosters a community where you can share and grow together.
          </p>
        </div>
      </div>

  
     

    
      <div className="w-full md:w-1/4 p-4 transform transition duration-1000 hover:scale-110">
        <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className='flex justify-center items-center'>
          <img src="/images/think.png" alt="think" className=" h-48 object-cover mb-4"/>
          </div>
          <h3 className="text-2xl font-bold mb-2">Reflect & Discuss</h3>
          <p className="text-base">
            Reflect on different topics and engage in thoughtful discussions. Think Out Loud is a space for meaningful conversations.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>


<section className="flex h-screen bg-gradient-to-r from-gray-900 via-gray-700 to-gray-400">
      <div className="w-1/3">
        <img src="/images/opinion.jpg" alt="opinion" className="object-cover w-full h-full" />
      </div>
      <div className="w-1/3 flex flex-col justify-center p-8 text-white">
        
          
          <p className="text-7xl font-bold mb-4 animate-textFadeIn -mt-20">
           We're waiting for your unique perspectives and insights!
          </p>
       
      </div>
      <div className="w-1/3 flex items-end justify-end p-8">
           <div className="w-1/3 flex items-end justify-end p-8">
       <Button variant={"custom"} className='mr-20 font-semibold py-6 px-12 text-lg rounded-full'  onClick={() => toggleModal('signIn')}>Join us Now!</Button>
      </div>
      </div>
      
    </section>

      </main>
      {modalType === 'signIn' && <SignInModal toggleModal={toggleModal} />}
      
     
    </div>
  );
}
