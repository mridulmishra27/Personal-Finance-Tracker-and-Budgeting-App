import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Transactions from "./pages/Transactions";
import Budget from "./pages/Budget";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./components/Sidebar";
import Header from './components/Header'
import Goals from "./pages/Goals";

const App = () => {
  return (
    <div className="min-h-screen bg-[#0b1022] text-white">
      <ToastContainer />
      <Sidebar />
      <div className="ml-64 px-6 py-6">
        <Header></Header>
      </div>
      <div className="ml-64 px-6 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/transactions/add" element={<Transactions />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/goals" element={<Goals />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;