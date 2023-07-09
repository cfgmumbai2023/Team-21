import React from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer"
import Bad from "../components/Courses";

const Badminton = () => {
  return (
    <div>
        <Navbar />
        <Bad type="Badminton" />
        <Footer />
    </div>
  )
}

export default Badminton