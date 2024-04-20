import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { Link } from "react-router-dom";

const SalarySlip = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/users/getSalarySlip", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const jsonData = await response.json();
        console.log("Data:", jsonData);

        setData(jsonData);
        setLoading(false);
       
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDisplay = async () => {
    try {
      const response = await fetch("http://localhost:8000/users/displaySalarySlip", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ display: true }),
      });
      const displayData = await response.json();
      if (displayData.error) {
        setTimeout(() => {
          setDisplay(false);
          
          alert(displayData.error);
        }, 5000);
        console.error("Error displaying data:", displayData.error);
        return;
      }
      else{
        setTimeout(() => {
          setDisplay(false);
          alert("Salary Slip is generated successfully");
          window.location.reload();
        }, 5000);

      }
  
      console.log("Display data:", displayData);


     
    } catch (error) {
      console.error("Error displaying data:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <h1 className="text-center text-4xl font-bold py-8">Salary Slip</h1>
      <button
  onClick={() => {
    handleDisplay();
    setDisplay(true);
  }}
  className="bg-blue-500 text-white font-bold py-2 px-4 rounded mb-4"
>
  Get latest month Salary Slip
</button>
{display && (
  <div role="status">
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="flex">
        <svg
          aria-hidden="true"
          className="w-24 h-24 text-gray-200 animate-spin dark:text-gray-800 fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
      <p className="text-white font-bold text-2xl mt-4">Salary Slip is Generating</p>
    </div>
  </div>
)}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {!loading && data.length > 0 ? (
          data.map((item, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="img-ctr">
                {item.cid && (
                  <a href={`https://${item.cid}.ipfs.dweb.link`} target="_blank" rel="noopener noreferrer">
                    <img
                      src={`https://${item.cid}.ipfs.dweb.link`}
                      className="w-full h-64 object-cover"
                      alt="NFT Image"
                    />
                  </a>
                )}
              </div>
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{item.month}</div>
                {item.transaction && (
                  <p className="text-gray-700 text-base">
                    <Link
                      to={`https://amoy.polygonscan.com/tx/${item.transaction}`}
                      className="bg-green-500 text-white font-bold py-2 px-4 rounded inline-block"
                      onClick={handleDisplay}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      TRX Details
                    </Link>
                  </p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default SalarySlip;
