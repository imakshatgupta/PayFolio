import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

export default function CompanyNavbar() {
  const [showPopup, setShowPopup] = useState(false);
  const [ employerUserName, setEmployerUserName] = useState("");
    const [employerAddress, setEmployerAddress] = useState("");
    const [employerSalary, setEmployerSalary] = useState("");
    const [company, setCompany] = useState({});

    const handleLogout = () => {
        localStorage.removeItem("companyId");
        window.location.href = "/companylogin";
        };

    useEffect(() => {
        getCompany();
      }, []);

      const getCompany = async () => {
        const res = await axios.get(
          "http://localhost:8000/company/getCompany",
          {
            headers: {
              Authorization: `${localStorage.getItem("companyId")}`,
            },
          }
        );
        console.log(res.data.company);
        setCompany(res.data.company);
      }


  const handleSubmit =async (e) => {
    e.preventDefault();
    try {
     const res= await axios.post("http://localhost:8000/company/addEmployer", {
        employerUserName,
        employerAddress,
        employerSalary,
        companyId: localStorage.getItem("companyId"),
      });
      console.log(res.data)
    } catch (error) {
        console.error("Error occurred:", error);
    }
    
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
                onChange={(e) => setEmployerUserName(e.target.value)}
                />
              </div>
              <div className="mb-4">
                
                <input
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Enter Wallet Address"
                  className="border-gray-300 p-3 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border rounded-md"
                onChange={(e) => setEmployerAddress(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <input
                  type="number"
                  id="number"
                  name="number"
                  placeholder="Enter Salary in Matic"
                  className="border-gray-300 p-3 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border rounded-md"
                onChange={(e) => setEmployerSalary(e.target.value)}
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
      <nav className="text-black">
        <div className="flex flex-wrap items-center justify-around p-4">
        <Link to="/companyhome" className="flex items-center space-x-3 rtl:space-x-reverse">
  <img src="payfolio.png" alt="PayFolio Logo" className="h-20 w-20" />
  <span className="self-center text-4xl font-semibold whitespace-nowrap dark:">
    PayFolio
  </span>
</Link>


          
          
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {company.name ? (
          <>
            <button
              onClick={() => setShowPopup(true)}
              type="button"
              className="focus:ring-4  font-medium rounded-lg text-2xl px-4 py-2 text-center"
            >
              Add Employee
            </button>
            <Link to="/companylogin">
              <button
                type="button"
                class="  focus:ring-4 focus:outline-none font-medium rounded-lg text-2xl px-4 py-2 text-center"
                >
                Login
              </button>
            </Link>
            <Link to="/companysignup">
              <button
                type="button"
                class="  focus:ring-4 focus:outline-none font-medium rounded-lg text-2xl px-4 py-2 text-center"
                >
                Signup
              </button>
            </Link>
            </>
            ) : (
                <>
                <h1 className="focus:ring-4 focus:outline-none font-medium rounded-lg text-2xl px-4 py-2 text-center">
                  Hello
                  <span className="font-bold ml-2 underline">
                   { company.companyName}
                  </span>
                </h1>
                <button onClick={handleLogout} className="focus:ring-4 focus:outline-none font-medium rounded-lg text-2xl px-4 py-2 text-center">
                  Logout
                </button>
              </>
            )}
        
            
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
