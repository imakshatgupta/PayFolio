import React from 'react'
import Navbar from '../Components/Navbar'
import axios from 'axios'
import { useEffect } from 'react'

export default function () {
  useEffect(() => {
    getCompany();
  }, []);

  const getCompany = async () => {
    const res = await axios.get(
      "http://localhost:8000/company/getCompany",
      {
        headers: {
          Authorization: `${localStorage.getItem("companyId")}`,
        },
      }
    );
    console.log(res.data.company);
  }

  

  return (
    <div>
        <Navbar/>
      
    </div>
  )
}
