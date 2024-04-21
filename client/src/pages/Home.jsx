import React from "react";
import Navbar from "../Components/Navbar";
import axios from "axios";
import { useEffect } from "react";
import Carousel from "../Components/Carousel";
import Stats from "../Components/Stats";
import Business from "../Components/Buisness";
import Working from "../Components/Working";
import Footer from "../Components/Footer";

export default function () {
  useEffect(() => {
    getCompany();
  }, []);

  const getCompany = async () => {
    const res = await axios.get("http://localhost:8000/company/getCompany", {
      headers: {
        Authorization: `${localStorage.getItem("companyId")}`,
      },
    });
    console.log(res.data.company);
  };

  return (
    <div>
      <Navbar />
      <Carousel />
      <Stats />
      <Business />
      <Working />
      <Footer />
    </div>
  );
}
