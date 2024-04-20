import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const [userName, setUsername] = useState("");
    const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // State to track loading
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when submitting form
    try {
      const res = await axios.post(
        "http://localhost:8000/users/register",
        {
          userName,
          fullName,
          email,
          password
        }
      );
      console.log(res);
      window.location.href = "/login";
    } catch (error) {
      console.error("Error occurred:", error);
    } finally {
      setLoading(false); // Reset loading regardless of success or error
    }
  };

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
              <Link to ='/companysignup'>
              <button className="p-2 border-2 text-white bg-black ml-20">
                For Company
              </button>
              </Link>
              <h1 class="text-xl font-bold text-white text-center leading-tight tracking-tight  md:text-2xl">
                User SignUp
              </h1>
              <form
                class="space-y-4 md:space-y-6"
                onSubmit={handleSubmit}
                action="#"
              >
                <div>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Username"
                    required=""
                    onChange={(e) => setUsername(e.target.value)}

                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Full Name"
                    required=""
                    onChange={(e) => setFullName(e.target.value)}

                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Email"
                    required=""
                    onChange={(e) => setEmail(e.target.value)}

                  />
                </div>
                <div>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Password"
                    required=""
                    onChange={(e) => setPassword(e.target.value)}

                  />
                </div>

                <button
                  type="submit"
                  class="w-full border font-bold text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300  rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  SignUp
                </button>
                <p class="text-sm font-light text-center text-gray-500 dark:text-gray-400">
                  Have an account?{" "}
                  <Link
                    to="/login"
                    class="  font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Login
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
