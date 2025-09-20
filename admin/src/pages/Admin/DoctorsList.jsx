import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorsList = () => {

  const { doctors, atoken, getDoctors, changeAvailability } = useContext(AdminContext)

  useEffect(() => {
    if (atoken) {
      getDoctors()
    }
  }, [atoken])

  return (
    // Added a scrollbar-hide utility class for a cleaner look
    <div className='m-5 max-h-[90vh] overflow-y-scroll scrollbar-hide'> {/* Modified */}
      <h1 className='text-xl font-semibold text-gray-700 mb-2'>All Doctors</h1> {/* Modified */}
      <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
        {
          doctors.map((doc, index) => (
            // --- Card Container Modifications ---
            <div 
              className='border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1' // Modified: Added background, shadow, and hover effects. Fixed 'group-' to 'group'.
              key={doc.id || index} // Best practice: Use a unique ID like doc.id for the key if available
            >
              {/* --- Image Modifications --- */}
              <img 
                src={doc.image} 
                alt={doc.name} // Best practice: Add descriptive alt text
                className='w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105' // Modified: Added classes for consistent sizing and a hover zoom effect.
              />
              {/* --- Text Content Modifications --- */}
              <div className='p-4 flex flex-col'> {/* Modified: Added padding and flex for better layout */}
                <p className='text-lg font-bold text-gray-800 truncate'>{doc.name}</p> {/* Modified: Styled the name */}
                <p className='text-sm text-indigo-600 font-semibold mb-3'>{doc.expertise}</p> {/* Modified: Styled the expertise and added margin-bottom */}
                
                {/* --- Availability Section Modifications --- */}
                <div className='flex items-center gap-2 mt-2'> {/* Modified: Aligned checkbox and text horizontally */}
                  <input 
                  onChange={() => changeAvailability(doc._id)}
                    type="checkbox" 
                    checked={doc.available} 
                    className='h-4 w-4 accent-indigo-500' // Modified: Styled checkbox and prevented clicking
                  />
                  <p className='text-sm text-gray-600'>Available</p> {/* Modified: Styled the label */}
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default DoctorsList