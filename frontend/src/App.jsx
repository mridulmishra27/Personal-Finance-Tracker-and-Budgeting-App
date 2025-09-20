import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import MyAppointments from './pages/MyAppointments'
import Appointments from './pages/Appointments'
import About from './pages/About'
import Doctors from './pages/Doctors'
import Contact from './pages/Contact'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AIChatbot from './components/AIChatbot'

const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/doctors' element={<Doctors />}/>
        <Route path='/doctors/:expertise' element={<Doctors />}/>
        <Route path='/contact' element={<Contact />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/appointments' element={<Appointments />} />
        <Route path='/my-appointments' element={<MyAppointments />} />
        <Route path='/appointments/:docid' element={<Appointments />} />
      </Routes>
      <AIChatbot />
      <Footer />
    </div>
  )
}

export default App