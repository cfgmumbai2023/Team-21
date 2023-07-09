import React from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer"
import Cric from "../components/Courses" 

const Cricket = () => {
  return (
    <div>
        <Navbar />
        <Cric type="Cricket" />
        <Footer />
    </div>
  )
}

export default Cricket