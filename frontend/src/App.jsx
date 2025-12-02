import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Login from './pages/Login'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from './components/Sidebar'
import Header from './components/Header'

const App = () => {
  return (
    <div className='min-h-screen bg-[#0a0f1d]'>
      <ToastContainer />
      <Sidebar />
      <div className='ml-64 min-h-screen'>
        <div className='p-6'>
          <Header />
          <div className='mt-6'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/profile' element={<Profile />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App