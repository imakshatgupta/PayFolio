import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'



export default function CompanyLogin() {
    const [companyName, setCompanyName] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false); // State to track loading

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
          const res = await axios.post("http://localhost:8000/company/loginCompany", {
            companyName,
            password,
          });
          console.log(res.data)
          localStorage.setItem("companyId", res.data.company._id);
          localStorage.setItem("token", res.data.token);
    
          setTimeout(() => {
            window.location.href = "/";
          }, 1000);
        } catch (error) {
          console.error("Error occurred:", error);
        } finally {
          setLoading(false);
        }
    }

  return (
    <div className="">
    <section class="bg-gray-50 dark:bg-gray-900">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            class="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          PayFolio
        </a>
        <div class="w-full  rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0  opacity-90">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <button className="p-2 border-2 text-white bg-black ml-4 mr-20">
              For User
            </button>
            <button className="p-2 border-2 text-white bg-black ml-20">
              For Company
            </button>
            <h1 class="text-xl font-bold text-white text-center leading-tight tracking-tight  md:text-2xl">
              User Login
            </h1>
            <form class="space-y-4 md:space-y-6" onSubmit={handleSubmit} action="#">
              <div>
               
                <input
                  type="text"
                  name="text"
                  id="text"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Username"
                  required=""
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>
              <div>
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                class="w-full border font-bold text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300  rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Login
              </button>
              <p class="text-sm font-light text-center text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <Link
                  to="/signup"
                  class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
  )
}
