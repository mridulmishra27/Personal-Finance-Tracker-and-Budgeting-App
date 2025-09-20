import React from 'react';
import { assets } from '../assets/assets';
import { FiArrowRight } from 'react-icons/fi'; // Using a popular icon library for crisp icons

const Header = () => {
  return (
    // Main wrapper with a modern gradient and generous padding
    <div className='bg-gradient-to-br from-cyan-50 to-blue-100 rounded-xl'>
      <div className='container mx-auto px-6 py-16 md:py-24 lg:py-28'>
        <div className='flex flex-col lg:flex-row items-center gap-12'>

          {/* Left Side: Text Content */}
          <div className='lg:w-1/2 text-center lg:text-left'>
            <h1 className='text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-800 mb-4 leading-tight'>
              Book Appointments<br />With Trusted Doctors
            </h1>

            <div className='flex items-center justify-center lg:justify-start gap-4 my-8'>
              <img className='w-28 h-auto' src={assets.group_profile} alt="Patient profiles" />
              <p className='max-w-md text-slate-600'>
                Browse through our trusted Doctors, schedule your appointments hassle-free.
              </p>
            </div>

            <a
              href='#expertise'
              className='inline-flex items-center gap-3 bg-emerald-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-emerald-600 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group'
            >
              Book Appointments
              <FiArrowRight className='w-5 h-5 transition-transform duration-300 group-hover:translate-x-1' />
            </a>
          </div>

          {/* Right Side: Image */}
          <div className='lg:w-1/2 flex justify-center lg:justify-end'>
            <img 
              className='w-full max-w-md lg:max-w-full h-auto object-cover rounded-xl shadow-2xl' 
              src={assets.header_img} 
              alt="Doctor smiling" 
            />
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Header;