// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract Transactions {
    address public company;
    mapping(address => uint256) public employeeSalaries;
    address[] public employees;
    uint256 public totalBalance;

    constructor() {
        company = msg.sender;
    }

    modifier onlyCompany() {
        require(msg.sender == company, "Only company can perform this action");
        _;
    }

    function deposit() external payable onlyCompany {
        totalBalance += msg.value;
    }

    function addEmployee(address _employee, uint256 _salary) external onlyCompany {
        employees.push(_employee);
        employeeSalaries[_employee] = _salary;
    }

    function payEmployees() external onlyCompany {
        require(totalBalance >= getTotalSalaries(), "Insufficient funds");

        for (uint i = 0; i < employees.length; i++) {
            payable(employees[i]).transfer(employeeSalaries[employees[i]]);
        }

        totalBalance -= getTotalSalaries();
    }

    function getTotalSalaries() internal view returns (uint256) {
        uint256 totalSalaries = 0;
        for (uint i = 0; i < employees.length; i++) {
            totalSalaries += employeeSalaries[employees[i]];
        }
        return totalSalaries;
    }
}
