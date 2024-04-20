import React from 'react';
import Image from '../assets/Carousel.png';

const Carousel = () => {
  return (
    <div className="flex justify-evenly">
      {/* Left Column */}
      <div className="p-8 flex flex-col justify-center items-center text-white rounded-lg  mr-4">
        <h2 className="text-xl font-bold mb-4">Left Column Text</h2>
        <p className="text-lg">Add your text here...</p>
      </div>
      <div className="p-10 overflow-hidden">
        <img className="w-[450px] h-[450px] mt-[100px] ml-[150px] object-contain" src={Image} alt="carousel" />
      </div>
    </div>
  );
};

export default Carousel;
