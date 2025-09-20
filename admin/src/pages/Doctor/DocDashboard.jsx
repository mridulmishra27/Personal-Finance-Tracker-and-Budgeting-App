import React from 'react'
import { useContext } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { useEffect } from 'react'
import { assets } from '../../assets/assets'
import { AppContext } from "../../context/AppContext";


const DocDashboard = () => {
  const {dtoken, dashData, setDashData, getDashData, completeAppointment, cancelAppointment} = useContext(DoctorContext)
  const {currency, slotFormat} = useContext(AppContext)
  useEffect(() => {
    if (dtoken) {
      getDashData()
    }
  },[dtoken])

  return dashData && (
    <div className='m-5'>
      <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-200 cursor-pointer hover:scale-110 transition-all">
            <img className="w-14" src={assets.earning_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-800">
                {" "}
                {currency} {dashData.earning}{" "}
              </p>
              <p className="text-gray-400">Earnings</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-200 cursor-pointer hover:scale-110 transition-all">
            <img className="w-14" src={assets.appointments_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-800">
                {" "}
                {dashData.appointment}{" "}
              </p>
              <p className="text-gray-400">Appointments</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-200 cursor-pointer hover:scale-110 transition-all">
            <img className="w-14" src={assets.patients_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-800">
                {" "}
                {dashData.patients}{" "}
              </p>
              <p className="text-gray-400">Patients</p>
            </div>
          </div>
        </div>

        <div className="bg-white">
                  <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border">
                    <img src={assets.list_icon} alt="" />
                    <p className="font-semibold">Latest Bookings</p>
                  </div>
                  <div className="pt-4 border border-t-0">
                    {dashData.latestAppointments.map((item, index) => (
                      <div className="flex items-center px-6 py-3 gap-3 hover:bg-gray-200" key={index}>
                        <img className="rounded-full w-10" src={item.userdata.image} alt="" />
                        <div className="flex-1 text-sm">
                          <p className="text-gray-800 font-medium"> {item.userdata.name} </p>
                          <p className="text-gray-600"> {slotFormat(item.slotDate)} </p>
                        </div>
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
                    ))}
                  </div>
                </div>
    </div>
  )
}

export default DocDashboard