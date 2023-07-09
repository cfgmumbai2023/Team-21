import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {ToastContainer,toast} from 'react-toastify'

/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
// const products = [
//     {
//       id: 1,
//       name: 'Basic Tee',
//       href: '#',
//       imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
//       imageAlt: "Front of men's Basic Tee in black.",
//       price: '$35',
//       color: 'Black',
//     },
//     {
//       id: 1,
//       name: 'Basic Tee',
//       href: '#',
//       imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
//       imageAlt: "Front of men's Basic Tee in black.",
//       price: '$35',
//       color: 'Black',
//     },
//     {
//       id: 1,
//       name: 'Basic Tee',
//       href: '#',
//       imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
//       imageAlt: "Front of men's Basic Tee in black.",
//       price: '$35',
//       color: 'Black',
//     },
//     {
//       id: 1,
//       name: 'Basic Tee',
//       href: '#',
//       imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
//       imageAlt: "Front of men's Basic Tee in black.",
//       price: '$35',
//       color: 'Black',
//     }
//     // More products...
//   ]
  
  export default function Example({ type }) {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    let response;
    const apiCall = async () => {
      if(type === ""){
          response = await fetch("http://localhost:5000/course/allcourses")
      }
      else{
        response = await fetch(`http://localhost:5000/course/courseName/${type}`)
      }
      const resData = await response.json()
      console.log(resData)
      setProducts(resData.courses)
    }
    useEffect(() => {
      apiCall();
    }, [])

    
    
    
    const restrictionHandle = async (level,id,sport)=>{
      const response = await fetch(`http://localhost:5000/user/${localStorage.getItem("id")}`)
      const dataRes = await response.json();
      console.log(dataRes);
      if(dataRes.success === true){
        dataRes.user.certificate.forEach((c1)=>{
          if(c1.sport === sport && (c1.level) >= (level)){
            navigate(`/course/${id}`);
          }
        })
      }
      else{
        console.log("Not eligible")
          toast.error(
            "Not Eligible for the Course",
            {
            position: "top-left",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            }
          )
        }
    }

    return (
      
      <div className="bg-white w-screen">
          <ToastContainer
                    position="top-left"
                    autoClose={1500}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
        <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Courses</h2>
  
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <div>
                <div key={product._id} className="group">
                  <div className="w-full overflow-hidden rounded-md lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <iframe title={product._id} autoPlay="false" src={product.contents ? product.contents[0].link : ""} width="240" height="260"></iframe>
                  </div>
                  <div className="flex items-center pb-2 ">
                      <h3 className="text-sm text-gray-700 mr-5">
                        <a href={product.href}>
                          {/* <span aria-hidden="true" className="absolute inset-0" /> */}
                          {product.title}
                        </a>
                      </h3>
                      <p className="mt-1 text-sm text-gray-500 mr-3">{product.sport}</p>
                      <p className="text-sm font-medium text-gray-900 ml-5">Level: {product.minCertificateLevel}</p>
                  </div>
                  </div>
                  <button onClick={() => restrictionHandle(product.minCertificateLevel,product._id,product.sport)} className="flex w-1/2 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Enroll Now</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
  