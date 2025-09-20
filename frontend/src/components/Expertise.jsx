import React from 'react';
import { expertiseData } from '../assets/assets'; // Assuming this path is correct
import { Link } from 'react-router-dom';

const Expertise = () => {
  return (
    // Section container with a light background and more padding for better separation
    <div className='bg-gray-50' id='expertise'>
      <div className='max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8'>
        
        {/* Section Header: Centered with improved typography */}
        <div className='text-center mb-16'>
          <h2 className='text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl'>
            Find by Expertise
          </h2>
          <p className='mt-4 max-w-2xl mx-auto text-lg text-gray-500'>
            Explore our wide range of medical specialties and find the right doctor for your needs.
          </p>
        </div>

        {/* Responsive Grid Layout for Expertise Cards */}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8'>
          {expertiseData.map((item, index) => (
            <Link
              key={index}
              to={`/doctors/${item.expertise}`}
              onClick={() => window.scrollTo(0, 0)}
              // Card Styling: Centered content, rounded corners, shadow, and transition effects
              className='group flex flex-col items-center text-center p-4 rounded-xl bg-white shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out'
            >
              {/* Circular background for the icon to make it pop */}
              <div className='flex items-center justify-center w-24 h-24 bg-indigo-100 rounded-full mb-4 group-hover:bg-indigo-200 transition-colors duration-300'>
                <img 
                  className='w-14 h-14 object-contain' // Ensure image fits well
                  src={item.image} 
                  alt={`${item.expertise} icon`} 
                />
              </div>
              <p className='font-semibold text-gray-800 text-base'>
                {item.expertise}
              </p>
            </Link>
          ))}
        </div>
        
      </div>
    </div>
  );
}

export default Expertise;