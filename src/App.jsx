// App.jsx

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Sports from "./Pages/Sports";
import Entertainment from "./Pages/Entertainment";
import Business from "./Pages/Business";
import Politics from "./Pages/Politics";
import Tech from "./Pages/Tech";
import SignupPage from "./Pages/Signup";
import LoginPage from "./Pages/Login";
import Profile from "./Pages/Parent_Component";
import ParentComponent from "./Pages/Parent_Component";




const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sports" element={<Sports />} />
        <Route path="/entertainment" element={<Entertainment />} />
        <Route path="/business" element={<Business />} />
        <Route path="/politics" element={<Politics />} />
        <Route path="/tech" element={<Tech />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ParentComponent/>}/>
      </Routes>
    </Router>
  );
};

export default App;
