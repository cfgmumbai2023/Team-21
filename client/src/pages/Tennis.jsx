import React from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer"
import Ten from "../components/Courses" 

const Tennis = () => {
  return (
    <div>
        <Navbar />
        <Ten type="Tennis" />
        <Footer />
    </div>
  )
}

export default Tennis