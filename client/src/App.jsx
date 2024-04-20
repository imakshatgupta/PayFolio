import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router,Routes,Route, BrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Login from './Components/Login'
import Signup from './Components/Signup'
import CompanyLogin from './Components/CompanyLogin'
import CompanySignup from './Components/CompanySignup'
import NFTmint from './pages/NFTmint'
import SalarySlip from './pages/SalarySlip'
import PayrollPage from './pages/PayrollPage'


function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path='/companylogin' element={<CompanyLogin/>}/>
      <Route path='/companysignup' element={<CompanySignup/>}/>
      <Route path='/nftmint' element={<NFTmint/>}/>
      <Route path='/salaryslip' element={<SalarySlip/>}/>
      <Route path='/payroll' element={<PayrollPage/>}/>

    </Routes>
    </BrowserRouter>
    
    </>
  )
}

export default App
