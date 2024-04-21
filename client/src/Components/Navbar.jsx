import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

export default function Navbar() {


  useEffect(() => {
    getUser();
  }, []);

  const [user, setUser] = useState({});

  const handleLogout = () => {
    localStorage.removeItem("userId");
    window.location.href = "/login";
  };


  const getUser = async () => {
    const res = await axios.get(
      "http://localhost:8000/users/getUser",
      {
        headers: {
          Authorization: `${localStorage.getItem("userId")}`,
        },
      }
    );
    console.log(res.data.user);
    setUser(res.data.user);
    
  };
  return (
    <div>
      <nav className="text-black">
        <div className="flex flex-wrap items-center justify-around p-4">
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <span className="self-center text-4xl font-semibold whitespace-nowrap dark:text-black">
              PayFolio
            </span>
          </Link>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {user.name ? (
              <>
                <button
                  type="button"
                  className="focus:ring-4 font-medium rounded-lg text-2xl px-4 py-2 text-center"
                >
                  Get started
                </button>
                <Link to="/login" className="focus:ring-4 focus:outline-none font-medium rounded-lg text-2xl px-4 py-2 text-center">
                  Login
                </Link>
                <Link to="/signup" className="focus:ring-4 focus:outline-none font-medium rounded-lg text-2xl px-4 py-2 text-center">
                  Signup
                </Link>
              </>
            ) : (
              <>
                <h1 className="focus:ring-4 focus:outline-none font-medium rounded-lg text-2xl px-4 py-2 text-center">
                  Hello
                  <span className="font-bold ml-2 underline">
                   { user.userName}
                  </span>
                </h1>
                <Link to='/salaryslip' className="focus:ring-4 focus:outline-none font-medium rounded-lg text-2xl px-4 py-2 text-center">
                  Salary Slip
                </Link>
                <button onClick={handleLogout} className="focus:ring-4 focus:outline-none font-medium rounded-lg text-2xl px-4 py-2 text-center">
                  Logout
                </button>
              </>
            )}
            <button
              data-collapse-toggle="navbar-cta"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-2xl text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-cta"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );  
}
