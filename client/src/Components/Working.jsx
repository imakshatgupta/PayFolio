import React from "react";
import { FaUserClock, FaCoins, FaCheckCircle } from "react-icons/fa";

const Working = () => {
  return (
    <div className="container mx-auto px-4 py-12 shadow-xl">
      <div className="flex justify-between flex-col items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-800 leading-snug">
          How Our Salary Management Platform Works
        </h1>
        <p className="text-gray-500">
          Discover the seamless process of managing salaries with our platform.
        </p>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <FaUserClock className="text-4xl text-[#90bee7] mb-4 mx-auto" />
          <h3 className="text-xl font-bold mb-2">Request Salary Advance</h3>
          <p className="text-gray-500">Employees can request salary advances for financial flexibility.</p>
        </div>
        <div className="text-center">
          <FaCoins className="text-4xl text-[#90bee7] mb-4 mx-auto" />
          <h3 className="text-xl font-bold mb-2">Automated Disbursement</h3>
          <p className="text-gray-500">Automatically disburse salaries to employees on predefined dates.</p>
        </div>
        <div className="text-center">
          <FaCheckCircle className="text-4xl text-[#90bee7] mb-4 mx-auto" />
          <h3 className="text-xl font-bold mb-2">NFT Salary Slips</h3>
          <p className="text-gray-500">Store salary slips securely as non-fungible tokens (NFTs) on the blockchain.</p>
        </div>
      </div>
    </div>
  );
};

export default Working;
