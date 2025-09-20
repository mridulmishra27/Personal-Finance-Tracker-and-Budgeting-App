import React, { useEffect, useContext } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const DoctorAppointments = () => {
  const { dtoken, appointments, getAppointments, completeAppointment, cancelAppointment } = useContext(DoctorContext)
  const { ageCalulator, slotFormat, currency } = useContext(AppContext)

  useEffect(() => {
    if (dtoken) {
      getAppointments()
    }
  }, [dtoken])

  return (
    <div className='w-full max-w-6xl mx-auto p-4'>
      <h2 className='mb-4 text-xl font-semibold text-gray-800'>All Appointments</h2>

      <div className='bg-white border rounded-md shadow-sm text-sm max-h-[80vh] min-h-[50vh] overflow-y-auto'>
        {/* Header row */}
        <div className='hidden sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-2 py-3 px-6 border-b bg-gray-100 font-medium text-gray-700'>
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {/* Appointment rows */}
        {appointments.length > 0 ? appointments.reverse().map((item, index) => (
          <div
            key={item._id || index}
            className='grid sm:grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] max-sm:flex max-sm:flex-col gap-2 items-center px-6 py-4 border-b text-gray-800'
          >
            <p>{index + 1}</p>

            <div className='flex items-center gap-3'>
              <img
                src={item.userdata?.image}
                alt='Patient'
                className='w-10 h-10 rounded-full object-cover border'
              />
              <p className='font-medium'>{item.userdata?.name}</p>
            </div>

            <p className={`text-sm px-3 py-1 rounded-full font-medium w-fit
              ${item.payment ? 'border border-green-700 text-green-700' : 'border border-yellow-700 text-yellow-700'}`}>
              {item.payment ? 'Online' : 'Cash'}
            </p>

            <p className='text-sm'>
              {ageCalulator(item.userdata?.dob)}
            </p>

            <p className='text-sm'>
              {slotFormat(item.slotDate)}, {item.slotTime}
            </p>

            <p className='text-sm'>
              {currency} {item.amount}
            </p>

            {
              item.cancel
              ? <p className='text-red-400 text-xs font-medium'>Appointment Cancelled</p>
              : item.isComplete
              ? <p className='text-green-500 text-xs font-medium'>Completed</p>
              : <div className='flex gap-2'>
              <button title="Cancel">
                <img onClick={() => cancelAppointment(item._id)}
                  src={assets.cancel_icon}
                  alt="Cancel"
                  className='w-10 cursor-pointer hover:scale-110 transition-transform'
                />
              </button>
              <button title="Confirm">
                <img onClick={() => completeAppointment(item._id)}
                  src={assets.tick_icon}
                  alt="Confirm"
                  className='w-10 cursor-pointer hover:scale-110 transition-transform'
                />
              </button>
            </div>
            }
          </div>
        )) : (
          <div className='text-center py-10 text-gray-500'>
            No appointments found.
          </div>
        )}
      </div>
    </div>
  )
}

export default DoctorAppointments
