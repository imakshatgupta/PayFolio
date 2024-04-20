import React from 'react';
import Image from '../assets/Carousel.png';

const Carousel = () => {
  return (
    <div className="flex justify-center items-center  bg-gray-100">
      <div className=" flex justify-between items-center text-center   bg-white p-12">
        {/* Left Column */}
        <div className="">
          <h2 className="text-4xl font-bold mb-4">Decentralized Salary Management</h2>
          <p className="text-lg text-gray-500">Welcome to our innovative salary management platform. Manage salaries, loans, and more securely and efficiently.</p>
        </div>
        {/* Right Column */}
        <div className="w-1/2">
          <img className="mx-auto w-[450px] h-[450px]" src={Image} alt="carousel" />
        </div>
      </div>
    </div>
  );
};

export default Carousel;
