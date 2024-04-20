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
      <h1 className="text-center text-4xl font-bold p-[20px]">Salary Slip</h1>
      <button onClick={handleDisplay}>Get latest month Salary Slip </button>
      <div className="p-[80px] flex justify-center items-center">
        {!loading && data.length > 0 ? (
          data.map((item, index) => (
            <div key={index} className="card">
              <div className="img-ctr">
                {item.cid && (
                  <a href={`https://${item.cid}.ipfs.dweb.link`} target="_blank" rel="noopener noreferrer">
                    <img
                      src={`https://${item.cid}.ipfs.dweb.link`}
                      className="w-[350px] h-[350px]"
                      alt="NFT Image"
                    />
                  </a>
                )}
              </div>
              <div className="transaction">
                {item.transaction && (
                  <p className="text-center p-[20px] grid gap-4">
                    <Link
                      to={`https://amoy.polygonscan.com/tx/${item.transaction}`}
                      className="border p-[10px] rounded bg-[#5dbea3] text-white hover:ease-in font-medium"
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
