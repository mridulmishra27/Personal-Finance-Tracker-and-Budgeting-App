import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MyAppointments = () => {
  const { backend, usertoken } = useContext(AppContext);
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([])

  const getAppointments = async () => {
    try {
      const {data} = await axios.get(backend + '/api/user/appointments', {headers:{usertoken}})
      
      if (data.success) {
        setAppointments(data.appointments.reverse())
      } else {
        toast.error(data.message || 'Failed to fetch appointments');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || 'Failed to fetch appointments')
    }
  }

  useEffect(()=> {
    if (usertoken) {
      getAppointments()
    } else {
      toast.info('Please login to view your appointments');
      navigate('/login');
    }
  },[usertoken, navigate])

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    // Convert 24-hour format to 12-hour format
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  // If not authenticated, don't render the component
  if (!usertoken) {
    return null;
  }

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center px-2 py-10 rounded-3xl">
      <h1 className="text-[1.7rem] font-bold text-slate-900 mb-8 tracking-tight">My Appointments</h1>

      {appointments.length === 0 ? (
        <div className="text-center text-gray-500 mt-8">
          <p className="text-lg">No appointments found</p>
          <p className="text-sm mt-2">You haven't booked any appointments yet.</p>
          <button 
            onClick={() => navigate('/doctors')}
            className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition"
          >
            Book Your First Appointment
          </button>
        </div>
      ) : (
        appointments.map((item, index) => (
          <div
            key={index}
            className="flex md:flex-row flex-col items-start gap-7 border border-gray-200 rounded-2xl bg-white shadow-sm p-6 mb-7"
          >
            {/* Doctor Image */}
            <img
              src={item.docData.image || '/default-doctor.png'}
              alt={item.docData.name}
              className="w-24 h-24 object-cover rounded-full border-4 border-indigo-500 bg-slate-200"
            />

            {/* Details */}
            <div className="flex-1">
              <p className="font-semibold text-lg text-slate-800 mb-1">{item.docData.name}</p>
              <p className="text-sm text-gray-500 mb-2">{item.docData.expertise}</p>
              <div className="mb-1">
                <span className="text-slate-700 font-medium">Address:</span>
                <span className="ml-1 text-gray-700 text-sm font-light italic">
                  {item.docData.address?.line1}, {item.docData.address?.line2}
                </span>
              </div>
              <div className="mt-3 mb-2 text-indigo-950 font-medium text-base">
                Date and Time:{" "}
                <span className="font-semibold">
                  {formatDate(item.slotDate)} | {formatTime(item.slotTime)}
                </span>
              </div>
              <div className="mb-2">
                <span className="text-slate-700 font-medium">Amount: </span>
                <span className="font-semibold text-green-600">₹{item.amount}</span>
              </div>
              <div className="mb-2">
                <span className="text-slate-700 font-medium">Status: </span>
                <span className={`font-semibold ${
                  item.cancel ? 'text-red-600' : 
                  item.isComplete ? 'text-green-600' : 
                  item.payment ? 'text-blue-600' : 'text-orange-600'
                }`}>
                  {item.cancel ? 'Cancelled' : 
                   item.isComplete ? 'Completed' : 
                   item.payment ? 'Paid' : 'Pending Payment'}
                </span>
              </div>
              {/* Buttons */}
              <div className="flex gap-4 pt-4">
                {!item.payment && !item.cancel && (
                  <button
                    className="px-5 py-2 bg-indigo-600 text-white rounded-full shadow font-medium hover:bg-indigo-700 transition"
                  >
                    Pay Online
                  </button>
                )}
                {!item.cancel && !item.isComplete && (
                  <button
                    className="px-5 py-2 bg-red-400 text-white rounded-full shadow font-medium hover:bg-red-500 transition"
                  >
                    Cancel Appointment
                  </button>
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyAppointments;
