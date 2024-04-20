import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { Link } from "react-router-dom";

const SalarySlip = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

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
        onClick={handleDisplay}
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Get latest month Salary Slip
      </button>
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
                <div className="font-bold text-xl mb-2">Transaction Details</div>
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
