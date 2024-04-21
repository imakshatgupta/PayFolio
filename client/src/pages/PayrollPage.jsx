import React, { useState, useEffect } from 'react';
import { depositFunds, addEmployee, payEmployees, getBalance } from '../utils/constants';

function PayrollPage() {
    const [amount, setAmount] = useState('');
    const [employeeAddress, setEmployeeAddress] = useState('');
    const [salary, setSalary] = useState('');
    const [contractBalance, setContractBalance] = useState(0);
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        async function fetchBalance() {
            const balance = await getBalance();
            setContractBalance(balance);
        }
        fetchBalance();
    }, []);

    const handleDeposit = async () => {
        await depositFunds(amount);
    };

    const handleAddEmployee = async () => {
        await addEmployee(employeeAddress, salary);
        setEmployees([...employees, { address: employeeAddress, salary: salary }]);
        setEmployeeAddress('');
        setSalary('');
    };

    const handlePayEmployees = async () => {
        await payEmployees();
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-semibold mb-8 text-center">Payroll Contract</h1>
                <div className="mb-6">
                    <h2 className="text-xl mb-4">Contract Balance: {contractBalance} MATIC</h2>
                    <div className="flex items-center mb-4">
                        <input type="text" className="w-48 p-2 border border-gray-300 rounded-l mr-2 focus:outline-none focus:border-blue-500" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount" />
                        <button className="bg-blue-500 text-white px-6 py-2 rounded-r hover:bg-blue-600 focus:outline-none" onClick={handleDeposit}>Deposit</button>
                    </div>
                </div>
                <div className="mb-6">
                    <div className="flex items-center mb-4">
                        <input type="text" className="w-48 p-2 border border-gray-300 rounded-l mr-2 focus:outline-none focus:border-blue-500" value={employeeAddress} onChange={(e) => setEmployeeAddress(e.target.value)} placeholder="Employee address" />
                        <input type="text" className="w-24 p-2 border border-gray-300 mr-2 focus:outline-none focus:border-blue-500" value={salary} onChange={(e) => setSalary(e.target.value)} placeholder="Salary" />
                        <button className="bg-blue-500 text-white px-6 py-2 rounded-r hover:bg-blue-600 focus:outline-none" onClick={handleAddEmployee}>Add Employee</button>
                    </div>
                    <div>
                        <h2 className="text-xl mb-4">Employees</h2>
                        <ul>
                            {employees.map((employee, index) => (
                                <li key={index}>{employee.address} - {employee.salary} MATIC</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="text-center">
                    <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 focus:outline-none" onClick={handlePayEmployees}>Pay Employees</button>
                </div>
            </div>
        </div>
    );
}

export default PayrollPage;
