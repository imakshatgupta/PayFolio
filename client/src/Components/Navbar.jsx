import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useEffect } from 'react'


export default function Navbar() {
  useEffect(() => {
    getUser();
  }, []);

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
    
  };
  return (
    <div>
       

<nav class="bg-white border-gray-200 dark:bg-gray-900">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
  <a href="https://flowbite.com/" class="flex items-center space-x-3 rtl:space-x-reverse">
      <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Flowbite Logo" />
      <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">PayFolio</span>
  </a>
  <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
    <Link to ='/loan'>
  <button type="button" class="text-white focus:ring-4  font-medium rounded-lg text-sm px-4 py-2 text-center">Take Loan</button>
  </Link>
  <Link to ='/login'>
  <button type="button" class="text-white  focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center ">Login</button>
    </Link>
    <Link to ='/signup'>
      <button type="button" class="text-white  focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center">Signup</button></Link>
        
      <button data-collapse-toggle="navbar-cta" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-cta" aria-expanded="false">
       
    </button>
  </div>
 
  </div>
</nav>

      
    </div>
  )
}
