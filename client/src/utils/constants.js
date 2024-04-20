import Web3 from "web3";
import TransactionsABI from "./Transactions.json";
const contractABI = TransactionsABI.abi;
const web3 = new Web3(window.ethereum);

const contractAddress = "0x24e098eF631eE4293AB262e918Bec89fa9Cd6217";

const transactionsContract = new web3.eth.Contract(
  contractABI,
  contractAddress
);

export const depositFunds = async (amount) => {
    try {
        const accounts = await web3.eth.getAccounts();
        await transactionsContract.methods.deposit().send({ from: accounts[0], value: web3.utils.toWei(amount.toString(), 'ether') });
    } catch (error) {
        console.error("Error depositing funds: ", error);
    }
};

export const addEmployee = async (employeeAddress, salary) => {
    try {
        const accounts = await web3.eth.getAccounts();
        await transactionsContract.methods.addEmployee(employeeAddress, salary).send({ from: accounts[0] });
    } catch (error) {
        console.error("Error adding employee: ", error);
    }
};

export const payEmployees = async () => {
    try {
        const accounts = await web3.eth.getAccounts();
        await transactionsContract.methods.payEmployees().send({ from: accounts[0] });
    } catch (error) {
        console.error("Error paying employees: ", error);
    }
};

export const getBalance = async () => {
    try {
        const balance = await web3.eth.getBalance(contractAddress);
        return web3.utils.fromWei(balance, 'ether');
    } catch (error) {
        console.error("Error getting contract balance: ", error);
        return 0;
    }
};
