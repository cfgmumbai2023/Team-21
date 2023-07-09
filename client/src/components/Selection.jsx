import React, { useState } from "react";
import InputLabel from '@mui/material/InputLabel';
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { FormControl } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';
import UploadWidget from "./Cloudinary/UploadWidget";
import axios from "axios";
import UploadCourseFiles from "./UploadCourseFiles";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const SignUp = () => {
    const navigate = useNavigate();
    const [courseTitle,setCourseTitle] = useState("");
    const [sports,setSports] = useState();
    const [gradingLevel,setGradingLevel] = useState("");
    const [files,setFiles] = useState([])
    const [video,setVideo] = useState("")
    
    const handleSportChange = (event) => {
        setSports(event.target.value);
      };
    const handleGradingChange = (event) => {
        setGradingLevel(event.target.value);
      };

    const handlerChange = (e) => {
        if (e.target.name === "courseTitle") setCourseTitle(e.target.value);
      };

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        let formData=new FormData();
        // const data = new FormData();
        // data.append("file",video);
        // data.append("upload_preset",'ziz4c8ad');
        // data.append("cloud_name",process.env.REACT_APP_CLOUD_NAME);
        // formData.append('courseTitle', courseTitle);

        // const resVideo = await fetch(`https://api.cloudinary.com/v1_1/dqzedyrjd/upload`,({
        //     method: "post",
        //     body: data     
        // }))
        // console.log(resVideo);
        
        // formData.append('videoLink', );
        
        for(let i=0;i<files.length;i++){
            console.log(files[i].file)
            formData.append("attachments",files[i].file);
        }

        formData.append('courseTitle', courseTitle);
        formData.append('sports', sports);
        formData.append('gradingLevel', gradingLevel);
        formData.append('userID',localStorage.getItem("id"));
    
        try{
          await axios.post(`http://localhost:5000/course/upload`,formData,{ headers: {
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
        navigate("/");
        
          
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
        // setCourseTitle("");
        // setSports("");
        // setGradingLevel("");
    }
  return (
    <div className="bg-zinc-200 min-h-screen flex items-center justify-center">
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
                <div className="flex border-white bg-white border-2 shadow-lg rounded-lg min-h-full w-2/3 flex-col justify-center px-6 py-12 my-10 lg:px-8 sm:w-1/2 lg:w-1/3">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-10 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Add Course
                    </h2>
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit} method="POST">
                        <div>
                        <label htmlFor="courseTitle" className="block text-sm font-medium leading-6 text-gray-900">
                            Course Title
                        </label>
                        <div className="mt-2">
                            <input
                            id="courseTitle"
                            name="courseTitle"
                            type="courseTitle"
                            autoComplete="courseTitle"
                            required
                            onChange={handlerChange}
                            value={courseTitle}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        </div>

                        <div className="flex pt-6 items-center justify-between"> 
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
                            {/* <InputLabel id="demo-simple-select-label">Age</InputLabel>                       */}
                            
                        </div>
                        <UploadCourseFiles files={files} setFiles={setFiles} />
                        {/* <input type="file" multiple onChange={(e) => console.log(e.target.files)} /> */}
                        <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            // onClick={handleSubmit}
                        >
                            Add Course
                        </button>
                        </div>
                    </form>
                </div>
      </div>
    </div>
  );
};

export default SignUp;
