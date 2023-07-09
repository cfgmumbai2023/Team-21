import React, {useState} from 'react'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { ToastContainer, toast } from "react-toastify";
import UploadFile from "./UploadFile";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { FormControl } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';
import UploadWidget from "./Cloudinary/UploadWidget";
import axios from "axios";
import InputLabel from '@mui/material/InputLabel';
import IFFLogo from "./IFFlogo.png";


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const AddLicense = () => {
    const [sports,setSports] = useState();
    const [gradingLevel,setGradingLevel] = useState("");
  const [files, setFiles] = React.useState([]);

  const handleSportChange = (event) => {
    setSports(event.target.value);
  };
const handleGradingChange = (event) => {
    setGradingLevel(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData=new FormData();
   
    for(let i=0;i<files.length;i++){
        formData.append("attachments",files[i].file);
    }

    formData.append('sports', sports);
    formData.append('gradingLevel', gradingLevel);
    
    try{
      await axios.post(`http://localhost:5000/user/addCertificate/${localStorage.getItem("id")}`,formData,{ headers: {
        'content-type': 'multipart/form-data'
      }})
      toast.success(
        "Successfully Added",
        {
        position: "top-left",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        }
    );
      
    }
    catch(error){
      const response = error.response;       
      toast.error("Some Error Happened", {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
      
    }
    setSports("");
    setGradingLevel("");
}

  return (
    <div className="bg-zinc-200 min-h-screen flex items-center justify-center">
    {/* <ToastContainer
                  position="top-left"
                  autoClose={1500}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
              /> */}
              <div className="flex border-white bg-white border-2 shadow-lg rounded-lg min-h-full w-2/3 flex-col justify-center px-6 py-12 my-10 lg:px-8 sm:w-1/2 lg:w-1/3">
                  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                  <img
                      className="mx-auto h-10 w-auto"
                      src={IFFLogo}
                      alt="Your Company"
                  />
                  <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                      Add License
                  </h2>
              </div>
              <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                  <form className="space-y-6" onSubmit={handleSubmit} method="POST">
                      

                      <div className="flex pt-2 items-center justify-between w-4/4"> 
                      <FormControl
                            sx={{ m: 1, width: "100%" }}
                            style={{ margin: "0px" }}
                        >
                            <InputLabel id="sports-label">Sports</InputLabel>
                            <Select
                                labelId="sports"
                                id="sports"
                                value={sports}
                                label="Sports"
                                onChange={handleSportChange}
                            >
                            <MenuItem value="Football" id="sports">Football</MenuItem>
                            <MenuItem value="Cricket" id="sports">Cricket</MenuItem>
                            <MenuItem value="Badminton" id="sports">Badminton</MenuItem>
                            <MenuItem value="Tennis" id="sports">Tennis</MenuItem>
                            </Select>
                            
                        </FormControl>                     
                        <FormControl
                            sx={{ m: 1, width: "100%" }}
                            style={{ margin: "0px" }}
                        >
                            <InputLabel id="grading-label">Grading</InputLabel>
                            <Select
                                labelId="gradingLevel"
                                id="gradingLevel"
                                value={gradingLevel}
                                label="GradingLevel"
                                onChange={handleGradingChange}
                            >
                            <MenuItem value="A">A</MenuItem>
                            <MenuItem value="B">B</MenuItem>
                            <MenuItem value="C">C</MenuItem>
                            <MenuItem value="D">D</MenuItem>
                            <MenuItem value="E">E</MenuItem>
                            </Select>
                            
                        </FormControl>
                      </div>
                      <UploadFile files={files} setFiles={setFiles}  />
                      <div>
                      <button
                          type="submit"
                          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          // onClick={handleSubmit}
                      >
                          Add License
                      </button>
                      </div>
                  </form>
              </div>
    </div>
  </div>
  )
}

export default AddLicense