import React from "react";

export default function Navbar() {
  return (
    <div>
      <nav class=" text-black border border-gray-200">
        <div class="flex flex-wrap items-center justify-around p-4">
          <a href="" class="flex items-center space-x-3 rtl:space-x-reverse">
            <span class="self-center text-4xl font-semibold whitespace-nowrap dark:">
              PayFolio
            </span>
          </a>
          <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button
              type="button"
              class=" focus:ring-4  font-medium rounded-lg text-2xl px-4 py-2 text-center"
            >
              Get started
            </button>
            <button
              type="button"
              class="  focus:ring-4 focus:outline-none font-medium rounded-lg text-2xl px-4 py-2 text-center "
            >
              Login
            </button>
            <button
              type="button"
              class="  focus:ring-4 focus:outline-none font-medium rounded-lg text-2xl px-4 py-2 text-center"
            >
              Signup
            </button>
            <button
              data-collapse-toggle="navbar-cta"
              type="button"
              class="inline-flex items-center p-2 w-10 h-10 justify-center text-2xl text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-cta"
              aria-expanded="false"
            >
              <span class="sr-only">Open main menu</span>
              <svg
                class="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
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
