import { useState } from "react";
import { FiUpload } from "react-icons/fi";
import Navbar from "../Components/Navbar";

const NftMint = () => {
    const [file, setFile] = useState(null);
    const [cid, setCid] = useState("");
    const [transaction, setTransaction] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (file) {
                setLoading(true);
                setError("");

                const formData = new FormData();
                formData.append("file", file);

                const response = await fetch('http://localhost:8000/nftMint', {
                    method: 'POST',
                    body: formData
                });

                const data = await response.json();
                setCid(data.cid);
                setTransaction(data.transactionHash);

                console.log(data.cid);
                console.log(data.transactionHash);
            }
        } catch (error) {
            setError("An error occurred while minting the NFT. Please try again.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const retrieveFile = (event) => {
        try {
            const data = event.target.files[0];
            setFile(data);
            event.preventDefault();
        } catch (error) {
            setError("Failed to retrieve the file.");
            console.error(error);
        }
    };

    return (
        <>
        <Navbar/>
        <div className="flex flex-col items-center justify-center p-[200px]">
            <div className="mb-8">
                {cid && (
                    <a href={`https://${cid}.ipfs.dweb.link`} target="_blank" rel="noopener noreferrer">
                        <img src={`https://${cid}.ipfs.dweb.link`} className="w-64 h-64 rounded-lg shadow-lg" alt="NFT Image" />
                    </a>
                )}
            </div>
            <div className="mb-8">
                {transaction && (
                    <a href={`https://amoy.polygonscan.com/tx/${transaction}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View Transaction Details</a>
                )}
            </div>
            <div className="mb-8">
                <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center">
                    <label htmlFor="file-upload" className="mb-4 flex items-center bg-gray-100 text-[30px] text-gray-600 p-4 rounded-lg cursor-pointer hover:bg-gray-200 transition duration-300 ease-in-out">
                        <FiUpload className="mr-2" />
                        Upload File
                    </label>
                    <input type="file" id="file-upload" className="hidden" onChange={retrieveFile} />
                    <button type="submit" className={`btn ${loading ? 'bg-gray-500 cursor-not-allowed' : 'text-2xl'}`} disabled={loading}>{loading ? "Minting..." : "Mint NFT"}</button>
                </form>
            </div>
            {error && <p className="text-red-500">{error}</p>}
        </div>
                </>
    );
};

export default NftMint;
