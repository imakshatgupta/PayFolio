import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function CompanyNavbar() {
  const [showPopup, setShowPopup] = useState(false);
  const [name, setName] = useState("");
    const [walletAddress, setWalletAddress] = useState("");
    const [salary, setSalary] = useState("");

  const handleSubmit = () => {
    console.log(name, walletAddress, salary);
    setShowPopup(false);
  };

  return (
    <div>
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white w-96 h-96 p-4 rounded-lg">
            <h2 className="text-xl   text-center font-bold mb-8 mt-4">Add Employee</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter Employee Name"
                  className="border-gray-300 mt-1 p-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border rounded-md"
                onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-4">
                
                <input
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Enter Wallet Address"
                  className="border-gray-300 p-3 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border rounded-md"
                onChange={(e) => setWalletAddress(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <input
                  type="number"
                  id="number"
                  name="number"
                  placeholder="Enter Salary in Matic"
                  className="border-gray-300 p-3 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border rounded-md"
                onChange={(e) => setSalary(e.target.value)}
                />
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-blue-500 mt-8  text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="https://flowbite.com/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              PayFolio
            </span>
          </a>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button
              onClick={() => setShowPopup(true)}
              type="button"
              className="text-white focus:ring-4  font-medium rounded-lg text-sm px-4 py-2 text-center"
            >
              Add Employee
            </button>
            <Link to="/companylogin">
              <button
                type="button"
                className="text-white  focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center "
              >
                Login
              </button>
            </Link>
            <Link to="/companysignup">
              <button
                type="button"
                className="text-white  focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center"
              >
                Signup
              </button>
            </Link>
            <button
              data-collapse-toggle="navbar-cta"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-cta"
              aria-expanded="false"
            ></button>
          </div>
        </div>
      </nav>
    </div>
  );
}
