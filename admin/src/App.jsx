import React, { useContext, useState } from "react";
import Login from "./pages/login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminContext } from "./context/AdminContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Admin/Dashboard";
import Appointments from "./pages/Admin/Appointments";
import DoctorsList from "./pages/Admin/DoctorsList";
import AddDoctor from "./pages/Admin/AddDoctor";
import { DoctorContext } from "./context/DoctorContext";
import DocDashboard from "./pages/Doctor/DocDashboard";
import DoctorAppointments from "./pages/Doctor/DoctorAppointment";
import DoctorProfile from "./pages/Doctor/DoctorProfile";

const App = () => {
  const { atoken } = useContext(AdminContext);
  const { dtoken } = useContext(DoctorContext);

  return atoken || dtoken ? (
    <div className="bg-white-50">
      <ToastContainer />
      <Navbar/>
      <div className="flex items-start">
        <Sidebar/>
        <Routes>
          {/* Admin */}
          <Route path="/" element={<></>} />
          <Route path="/admin-dashboard" element={<Dashboard/>} />
          <Route path="/all-appointments" element={<Appointments/>} />
          <Route path="/add-doc" element={<AddDoctor/>} />
          <Route path="/doc-list" element={<DoctorsList/>} />
          {/* Doctor */}
          <Route path="/doc-dashboard" element={<DocDashboard/>} />
          <Route path="/doc-appointments" element={<DoctorAppointments/>} />
          <Route path="/doc-profile" element={<DoctorProfile/>} />
        </Routes>
      </div>
    </div>
  ) 
  : (
    <>
    <Login />
    <ToastContainer />
    </>
  )
};

export default App;
