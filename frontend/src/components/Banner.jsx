import React from 'react';
import { assets } from '../assets/assets'; // Assuming assets are correctly imported
import { useNavigate } from 'react-router-dom';

const Banner = () => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/login');
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Use smooth scroll for better UX
  };

  return (
    // Main container with a modern gradient, rounded corners, and responsive margin
    <div className='relative my-20 md:mx-10 overflow-hidden rounded-xl bg-gradient-to-br from-teal-400 to-emerald-600 shadow-lg'>
      <div className='grid md:grid-cols-2 gap-4'>
        
        {/* Left Side: Text Content & Call to Action */}
        <div className='z-10 flex flex-col justify-center p-8 sm:p-12 md:p-16 text-white'>
          <h1 className='text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight' style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}>
            Book an Appointment
          </h1>
          <p className='mt-4 text-lg sm:text-xl text-emerald-100 max-w-md'>
            Connect instantly with our network of over 100 trusted and certified medical professionals.
          </p>
          <button
            onClick={handleRegisterClick}
            className='mt-8 w-max px-8 py-3 bg-white text-emerald-700 font-bold rounded-full shadow-md
                       transform transition-all duration-300 ease-in-out
                       hover:bg-gray-100 hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white'
          >
            Register Now
          </button>
        </div>

        {/* Right Side: Image */}
        {/* The image is now contained within the grid for better responsive behavior */}
        <div className='hidden md:flex justify-center items-end'>
          <img
            className='h-full max-h-[450px] w-auto object-cover object-bottom'
            src={assets.appointment_img} // Use your imported image asset
            alt="Doctor appointment illustration"
            style={{ filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.3))' }}
          />
        </div>
        
      </div>
    </div>
  );
};

export default Banner;