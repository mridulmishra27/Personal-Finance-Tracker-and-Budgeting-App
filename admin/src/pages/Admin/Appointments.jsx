import React, { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useEffect } from 'react'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const Appointments = () => {

  const {atoken, appointments, getAppointments, appointmentCancellation} = useContext(AdminContext)
  const {ageCalulator, slotFormat, currency} = useContext(AppContext)

  useEffect(() => {
    if (atoken) {
      getAppointments()
    }
  },[atoken])

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>

      <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll'>
        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b'>
          <p>#</p>
          <p>Patient Name</p>
          <p>Patient Age</p>
          <p>Date and Time</p>
          <p>Doctor Name</p>
          <p>Fees</p>
          <p>Action </p>
        </div>

        {appointments.map((item, index)=>(
          <div className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-800 py-3 px-6 border-b hover:bg-gray-100' key={index}>
            <p className='max-sm:hidden'> {index+1} </p>
            <div className='flex items-center gap-2'>
              <img className='w-8 rounded-full' src={item.userdata.image} alt="" /> <p> {item.userdata.name} </p>
            </div>
            <p className='max-sm:hidden'> {ageCalulator(item.userdata.dob)} </p>
            <p> {slotFormat(item.slotDate)}, {item.slotTime} </p>
            <div className='flex items-center gap-2'>
              <img className='w-8 rounded-full bg-gray-400' src={item.docData.image} alt="" /> <p> {item.docData.name} </p>
            </div>
            <p> {currency} {item.amount} </p>
            {item.cancel
            ? <p className='text-red-600 text-xs font-medium'>Appointment Cancelled</p>
            : item.isComplete ? <p className='text-green-600 text-xs font-medium'>Completed</p> : <img onClick={() => appointmentCancellation(item._id)} className='w-10 cursor-pointer ' src= {assets.cancel_icon} alt="" />
          }
          </div>
        ))}

      </div>
    </div>
  )
}

export default Appointments