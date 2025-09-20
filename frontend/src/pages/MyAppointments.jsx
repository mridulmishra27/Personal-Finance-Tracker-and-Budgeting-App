import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const MyAppointments = () => {
  const { backend, usertoken, getDoctorsData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const months = [
    "", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  const slotFormat = (slotDate) => {
    const dateArray = slotDate.split(/[-_]/);
    return `${dateArray[0]} ${months[Number(dateArray[1])]} ${dateArray[2]}`;
  };

  const getAppointments = async () => {
    try {
      const { data } = await axios.get(`${backend}/api/user/appointments`, {
        headers: { usertoken },
      });
      if (data.success) {
        setAppointments(data.appointments.reverse());
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentid) => {
    try {
      const { data } = await axios.post(
        `${backend}/api/user/cancel-appointment`,
        { appointmentid },
        { headers: { usertoken } }
      );

      if (data.success) {
        toast.success(data.message);
        getAppointments();
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (usertoken) {
      getAppointments();
    }
  }, [usertoken]);

  // Create a map to hold the most relevant appointment for each unique slot
  const uniqueAppointmentsMap = {};
  appointments.forEach(appointment => {
    // A unique key is created from the doctor's ID, date, and time
    const key = `${appointment.docData._id}-${appointment.slotDate}-${appointment.slotTime}`;
    const existingAppointment = uniqueAppointmentsMap[key];

    // If we haven't stored an appointment for this slot yet, or
    // if the one we have stored is cancelled and the new one is NOT,
    // then we should store the new (active) one.
    if (!existingAppointment || (existingAppointment.cancel && !appointment.cancel)) {
      uniqueAppointmentsMap[key] = appointment;
    }
  });
  const filteredAppointments = Object.values(uniqueAppointmentsMap);

  return (
    // Main container with responsive padding
    <div className="bg-gray-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8 rounded-3xl">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-10 tracking-tight text-center">
          My Appointments
        </h1>

        {filteredAppointments.length > 0 ? (
          // Grid container: 1 col on mobile, 2 on tablet, 3 on desktop
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredAppointments.map((item, index) => (
              // Appointment Card: Redesigned for a vertical layout to fit the grid
              <div
                key={index}
                className="flex flex-col items-center border border-gray-200 rounded-2xl bg-white shadow-lg p-6 transform hover:-translate-y-1 transition-transform duration-300"
              >
                {/* Doctor Image */}
                <img
                  src={item.docData.image}
                  alt={item.docData.name}
                  className="w-28 h-28 object-cover rounded-full border-4 border-indigo-500 bg-slate-200 mb-4"
                />

                {/* Details Container */}
                <div className="w-full text-center">
                  <p className="font-semibold text-xl text-slate-800 mb-1">
                    {item.docData.name}
                  </p>
                  <p className="text-sm text-gray-500 mb-3">
                    {item.docData.expertise}
                  </p>
                  <div className="mb-3 text-left border-t pt-3">
                    <span className="text-slate-700 font-medium">Address:</span>
                    <span className="ml-1 text-gray-600 text-sm">
                      {item?.docData?.address?.line1 || 'N/A'}
                      {item?.docData?.address?.line2 ? `, ${item.docData.address.line2}` : ''}
                    </span>
                  </div>
                  <div className="mt-2 mb-4 p-3 bg-indigo-50 rounded-lg text-indigo-950 font-medium text-base">
                    <span className="font-semibold">
                      {slotFormat(item.slotDate)} at {item.slotTime}
                    </span>
                  </div>
                  
                  {/* Buttons Container */}
                  <div className="flex flex-col items-center gap-3 pt-4 border-t w-full">
                    {!item.cancel && !item.isComplete && (
                      <>
                        <button className="w-full px-5 py-2.5 bg-indigo-600 text-white rounded-full shadow font-medium hover:bg-indigo-700 transition">
                          Pay Online
                        </button>
                        <button
                          onClick={() => cancelAppointment(item._id)}
                          className="w-full px-5 py-2.5 bg-red-400 text-white rounded-full shadow font-medium hover:bg-red-500 transition"
                        >
                          Cancel Appointment
                        </button>
                      </>
                    )}
                    {item.cancel && !item.isComplete && (
                      <button className='w-full px-5 py-2.5 border border-red-900 text-red-600 rounded-full shadow font-medium cursor-not-allowed'>
                        Appointment Cancelled
                      </button>
                    )}
                    {item.isComplete && (
                      <button className='w-full px-5 py-2.5 border border-green-900 text-green-600 rounded-full shadow font-medium cursor-not-allowed'>
                        Appointment Completed
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Empty state when no appointments are found
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">You have no appointments scheduled.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAppointments;