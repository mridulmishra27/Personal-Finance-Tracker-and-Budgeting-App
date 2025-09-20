import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const TopDoctors = () => {

     const navigate = useNavigate()
     const{doctors} =useContext(AppContext)

  return (
    <div className='flex flex-col items-center gap-4 my-15 text-gray-800 md:mx-10'>
     <h1 className='text-3xl font-medium'> Top Doctors To Book </h1>
     <p className='w-1/3 text-center text-sm'>Explore our comprehensive list of reputable doctors.</p>
     <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
          {doctors.slice(0,10).map((doctor,index) =>(
               <div
                key={doctor._id}
                onClick={() => navigate(`/appointments/${doctor._id}`)}
                className="bg-white rounded-2xl shadow-lg border border-slate-200/80 overflow-hidden cursor-pointer group transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="p-6 text-center">
                  <div className="relative inline-block">
                    <img
                      className="w-28 h-28 rounded-full object-cover ring-4 ring-slate-100 group-hover:ring-teal-100 transition-all"
                      src={doctor.image}
                      alt={doctor.name}
                    />
                    <span className={`absolute bottom-1 right-2 block h-4 w-4 rounded-full border-2 border-white ${doctor.available ? 'bg-green-500' : 'bg-red-500'}`}></span>
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-slate-800">{doctor.name}</h3>
                  <p className="text-teal-600 font-medium mt-1">{doctor.expertise}</p>
                  
                  <div className={`mt-3 inline-flex items-center gap-2 text-sm font-semibold px-3 py-1 rounded-full ${doctor.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {doctor.available ? 'Available Now' : 'Unavailable'}
                  </div>
                </div>
                <div className="bg-slate-50/70 p-4">
                   <button className="w-full text-center font-semibold text-teal-700 group-hover:text-teal-500 transition">
                    Book Appointment
                   </button>
                </div>
              </div>
          ))}
     </div>
     <button onClick={() => {navigate('/doctors'); scrollTo(0,0)}} className='bg-blue-100 text-gray-700 px-12 py-3 rounded-full mt-10'>View more...</button>
    </div>
  )
}

export default TopDoctors