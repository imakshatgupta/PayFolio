import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router,Routes,Route, BrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Login from './Components/Login'
import Signup from './Components/Signup'
import NFTmint from './pages/NFTmint'



function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path='/nftmint' element={<NFTmint/>}/>
    </Routes>
    </BrowserRouter>
    
    </>
  )
}

export default App
