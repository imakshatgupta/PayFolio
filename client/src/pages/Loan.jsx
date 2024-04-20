import React, { useEffect, useState } from "react";
import axios from "axios";
import CompanyNavbar from "../Components/CompanyNavbar";
import { useNavigate } from "react-router-dom";


export default function Loan() {
  const [salary, setSalary] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [resultpopup, setResultPopup] = useState(false);
  const [employersData, setEmployersData] = useState([]);
  const [userName, setUserName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [withdrawalAmount, setWithdrwalAmount] = useState(0);
  const [days, setDays] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    getUser();
    getCompany();
  }, [salary, userName, companyName]);

  const getUser = async () => {
    const res = await axios.get("http://localhost:8000/users/getUser", {
      headers: {
        Authorization: `${localStorage.getItem("userId")}`,
      },
    });
    console.log("hello", res.data.user);
    setUserName(res.data.user.userName);
  };

  const getCompany = async () => {
    const res = await axios.get("http://localhost:8000/company/getCompany", {
      headers: {
        Authorization: `${localStorage.getItem("companyId")}`,
      },
    });
    console.log("company", res.data.company);
    setCompanyName(res.data.company.companyName);
    setEmployersData(res.data.company.employers);
    findinfo();
  };

  const findinfo = () => {
    const userExist = employersData.find(
      (employer) => employer.employerUserName === userName
    );
    if (userExist) {
      console.log("Employer Already Exists");
      console.log(userExist.employerSalary);
      setSalary(userExist.employerSalary);
    } else {
      console.log("Employer Does Not Exist");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    setShowPopup(false);
    setResultPopup(true);

    if (withdrawalAmount > salary) {
      alert("You can't withdraw more than your salary");
      return;
    }
    setTimeout(() => {
        setResultPopup(false);
        navigate("/");
    }, 1000);

    
  };

  const currentDate = new Date();
  const nextMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    1
  );
  const formattedNextMonth = `${nextMonth.getFullYear()}-${(
    nextMonth.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-01`;
  const timeDifference = nextMonth.getTime() - currentDate.getTime();
  const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
  const amount = (withdrawalAmount * 8 * (daysDifference / 36)) / 100;
  const interestAmount = Math.round(amount);
  console.log(interestAmount);

  const nextMonthSalary =
    parseInt(salary) - parseInt(withdrawalAmount) - parseInt(interestAmount);

  return (
    <div>
      <CompanyNavbar />

      <div className="border mr-72 p-3 ml-96 mt-10 ">
        <div className="text-center">
          <h1 className="font-bold text-xl">Company Name: {companyName}</h1>
        </div>
        <div className="flex">
          <h1 className="flex font-semibold mt-8">
            UserName:<h1 className="ml-2">{userName}</h1>
          </h1>
          <h1 className=" flex font-semibold mt-8 ml-52">
            Salary:<h1 className="ml-2">₹{salary}</h1>
          </h1>
        </div>
        <div className="flex">
          <h1 className="flex font-semibold mt-4">
            Salary Date:<h1 className="ml-2">01/5/2024</h1>
          </h1>
          <h1 className=" flex font-semibold mt-4 ml-40">
            Next Month Salary:<h1 className="ml-2">₹{nextMonthSalary}</h1>
          </h1>
        </div>
        <button
          className="mt-6 ml-40 bg-black text-white rounded-xl border p-2"
          onClick={() => setShowPopup(true)}
        >
          Apply for Loan
        </button>
      </div>
      <div></div>

      {resultpopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white w-96 h-72 p-4 rounded-lg">
            <h2 className="text-xl text-green  text-center font-bold mb-8 mt-10">Your Amount will be credited shortly...</h2>
            
          </div>
        </div>
      )}

      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white w-96  p-4 rounded-lg">
            <h2 className="text-xl   text-center font-bold mb-8 mt-4">
              Loan Details
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Company Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={companyName}
                  placeholder="Enter Employee Name"
                  className="border-gray-300 mt-1 p-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Salary
                </label>

                <input
                  type="text"
                  id="address"
                  name="address"
                  value={salary}
                  placeholder="Enter Wallet Address"
                  className="border-gray-300 p-3 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Enter Withdraw Amount
                </label>
                <input
                  type="number"
                  id="number"
                  name="number"
                  placeholder="Enter Amount"
                  className="border-gray-300 p-3 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border rounded-md"
                  onChange={(e) => setWithdrwalAmount(e.target.value)}
                />
              </div>
              {/* <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Enter No of Days
                </label>
                <input
                  type="number"
                  id="number"
                  name="number"
                  placeholder="Enter Number of Days"
                  className="border-gray-300 p-3 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border rounded-md"
               onChange={(e)=>setDays(e.target.value)}
               />
              </div> */}

              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Interest Amount
                </label>
                <input
                  type="number"
                  id="number"
                  name="number"
                  value={interestAmount}
                  placeholder="Enter Salary in Matic"
                  className="border-gray-300 p-3 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border rounded-md"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Next Month Salary
                </label>
                <input
                  type="number"
                  id="number"
                  name="number"
                  value={nextMonthSalary}
                  placeholder="Enter Salary in Matic"
                  className="border-gray-300 p-3 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border rounded-md"
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
    </div>
  );
}
