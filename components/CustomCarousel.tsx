// components/CustomCarousel.tsx
import React, { useState } from 'react';
import Slider from 'react-slick';
import { motion } from 'framer-motion';

interface CustomCarouselProps {
  slides: React.ReactNode[];
  onSlideChange: (index: number) => void;
}

const CustomCarousel: React.FC<CustomCarouselProps> = ({ slides, onSlideChange }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    afterChange: (current: number) => onSlideChange(current),
  };

  return (
    <Slider {...settings}>
      {slides.map((slide, index) => (
        <div key={index}>
          <motion.div
            className="w-full"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            {slide}
          </motion.div>
        </div>
      ))}
    </Slider>
  );
};

export default CustomCarousel;
