import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios";

const Appointments = () => {
  const { docid } = useParams();
  const { doctors, currency, backend, getDoctorsData, usertoken } = useContext(AppContext);
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const navigate = useNavigate();
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotsIndex, setSlotsindex] = useState(0);
  const [slotTime, setSlotTime] = useState('');

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docid);
    setDocInfo(docInfo);
  };

  const getAvailableSlots = () => {
    // Guard clause to prevent running before docInfo is loaded
    if (!docInfo) {
      return;
    }

    let today = new Date();
    let allSlots = [];

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date(today);
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        let now = new Date();
        currentDate.setHours(now.getHours() >= 10 ? now.getHours() + 1 : 10);
        currentDate.setMinutes(now.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        let day = currentDate.getDate()
        let month = currentDate.getMonth() + 1
        let year = currentDate.getFullYear()

        const slotDate = day + "-" + month + "-" + year
        
        // Check if the slot is booked
        const isBooked = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(formattedTime);
        
        // Only add the slot if it's NOT booked
        if (!isBooked) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime
          });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      allSlots.push(timeSlots);
    }
    setDocSlots(allSlots);
  };

  const bookAppointment = async () => {
    if (!usertoken) {
      toast.warn('Login to Book Appointment');
      return navigate('/login');
    }
    if (!slotTime) {
      toast.warn('Please select a time slot.');
      return;
    }
    try {
      // Find the full details of the selected slot to ensure data is correct
      const selectedSlot = docSlots[slotsIndex].find(slot => slot.time === slotTime);
      
      if (!selectedSlot) {
        toast.error("Selected slot not found. It might have just been booked.");
        return;
      }

      const date = selectedSlot.datetime; // Use the datetime from the specific selected slot
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      const slotDate = `${day}-${month}-${year}`;

      const { data } = await axios.post(backend + '/api/user/book-appointment', { docid, slotDate, slotTime }, { headers: { usertoken } });

      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate('/my-appointments');
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docid]);

  useEffect(() => {
    // This will run automatically whenever docInfo is updated
    getAvailableSlots();
  }, [docInfo]);

  return (
    docInfo && (
      <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
        {/* Doctor Info Card */}
        <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          <div className="flex justify-center">
            <img
              src={docInfo.image}
              alt={docInfo.name}
              className="w-36 h-36 md:w-44 md:h-44 rounded-full border-4 border-gray-100 object-cover"
            />
          </div>

          <div className="md:col-span-2 space-y-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 flex items-center gap-2">
                {docInfo.name}
                <img src={assets.verified_icon} alt="Verified" className="w-5 h-5" />
              </h2>
              <p className="text-gray-600">{docInfo.degree} - {docInfo.expertise}</p>
              <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full inline-block mt-1">
                {docInfo.experience}
              </span>
            </div>

            <div>
              <p className="text-lg font-medium text-gray-700 flex items-center gap-2">
                About
                <img src={assets.info_icon} alt="Info" className="w-5 h-5 opacity-70" />
              </p>
              <p className="text-gray-600 leading-relaxed text-justify text-sm">
                {docInfo.about}
              </p>
            </div>

            <div>
              <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-4 py-2 rounded-full">
                Appointment Fees: {currency}{docInfo.fees}
              </span>
            </div>
          </div>
        </div>

        {/* Booking Slots Section */}
        <div className="max-w-4xl mx-auto mt-10">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Book a Slot</h3>

          {/* Days - only shows days with available slots */}
          <div className="flex gap-3 overflow-x-auto scrollbar-thin pb-2">
            {
              docSlots.map((item, index) => {
                // If there are no slots for this day (item is an empty array), render nothing
                if (item.length === 0) {
                  return null;
                }
                // Otherwise, render the day button
                return (
                  <div
                    key={index}
                    onClick={() => setSlotsindex(index)}
                    className={`text-center px-4 py-3 min-w-20 rounded-lg cursor-pointer shadow-sm transition-all
                    ${slotsIndex === index ? 'bg-emerald-500 text-white' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'}`}
                  >
                    <p className="font-semibold">{daysOfWeek[item[0].datetime.getDay()]}</p>
                    <p className="text-sm">{item[0].datetime.getDate()}</p>
                  </div>
                )
              })
            }
          </div>

          {/* Time Slots */}
          <div className="flex gap-3 flex-wrap mt-5">
            {
              // Check if docSlots and the selected day's slots exist
              docSlots.length > 0 && docSlots[slotsIndex] ? (
                docSlots[slotsIndex].map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setSlotTime(item.time)}
                    className={`px-4 py-2 rounded-full text-sm transition
                    ${item.time === slotTime ? 'bg-emerald-600 text-white' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'}`}
                  >
                    {item.time.toLowerCase()}
                  </button>
                ))
              ) : (
                <p className="text-gray-500">No available slots for this day.</p>
              )
            }
          </div>

          <div className="mt-8">
            <button
              onClick={bookAppointment}
              className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-8 py-3 rounded-full transition"
            >
              Book Appointment
            </button>
          </div>
        </div>

        {/* Related Doctors */}
        <div>
          <RelatedDoctors docid={docid} expertise={docInfo.expertise} />
        </div>
      </div>
    )
  );
};

export default Appointments;