import Web3 from "web3";
import TransactionsABI from "./Transactions.json";
const contractABI = TransactionsABI.abi;
const web3 = new Web3(window.ethereum);

const contractAddress = "0x46940D47Cc315f072707c5369CEa09594af4d73E";

const transactionsContract = new web3.eth.Contract(
  contractABI,
  contractAddress
);


