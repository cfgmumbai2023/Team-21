import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
// import Home from "./pages/Home";
import AddCourse from "./pages/AddCourse";
import AddLicense from "./pages/AddLicense";
import Home from "./pages/Home";
import Football from "./pages/Football";
import Cricket from "./pages/Cricket";
import Badminton from "./pages/Badminton";
import Tennis from "./pages/Tennis";
import Course from "./pages/Course";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/addLicense" element={<AddLicense />} />
          <Route path="/Football" element={<Football />} />
          <Route path="/Cricket" element={<Cricket />} />
          <Route path="/Badminton" element={<Badminton />} />
          <Route path="/Tennis" element={<Tennis />} />
          <Route path="/addCourse" element={<AddCourse />} />
          <Route path="/course">
            <Route path=":id">
              <Route index element={<Course />} />
            </Route>
          </Route> 
          {/* <Route path="/table" element={<RowSelection />} /> */}
          <Route path="*" element={<h1>Error 404! The requested page does not exist</h1>} />
        </Routes>
      </Router>
    </>

  
  );
}

export default App;
