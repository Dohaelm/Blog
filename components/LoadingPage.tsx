import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

const LoadingPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-black via-gray-800 to-gray-900 text-white">
      <div className="text-center">
     
        <div className="relative flex justify-center items-center mt-2">
          <FontAwesomeIcon icon={faPencilAlt} className="text-red-800 pencil-animation" size="3x" />
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
