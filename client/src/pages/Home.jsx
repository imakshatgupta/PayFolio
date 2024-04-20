import React from 'react'
import Navbar from '../Components/Navbar'
import Carousel from '../Components/Carousel'
import Stats from '../Components/Stats'
import Business from '../Components/Buisness'
import Working from '../Components/Working'
import Footer from '../Components/Footer'

export default function () {
  return (
    <div>
        <Navbar/>
        <Carousel/>
       <Stats/>
       <Business/>
       <Working/>
       <Footer/>
    </div>
  )
}
