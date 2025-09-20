import React, { useContext, useEffect } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
// import { MapPinIcon, PencilSquareIcon } from '@heroicons/react/24/solid';

const DoctorProfile = () => {
  const { dtoken, profileData, getProfile, setProfileData, backend } = useContext(DoctorContext);
  const { currency } = useContext(AppContext);
  const [edit, setEdit] = useState(false)
  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available,
      }
      const {data} = await axios.post(backend + '/api/doctor/update-profile', updateData, {headers:{dtoken}})
      if (data.success) {
        toast.success(data.message)
        setEdit(false)
        getProfile()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
      console.log(error);
    }
  }

  useEffect(() => {
    if (dtoken) {
      getProfile();
    }
  }, [dtoken]);

  return profileData && (
    <div className="bg-slate-50 min-h-screen flex items-center justify-center p-4 font-sans">
      {/* Main Profile Card */}
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-lg p-8">

        {/* --- Profile Header --- */}
        <div className="flex flex-col sm:flex-row items-center sm:space-x-8">
          <div className="flex-shrink-0">
            <img 
              className="w-28 h-28 rounded-full object-cover border-4 border-indigo-200" 
              src={profileData.image} 
              alt={`${profileData.name}'s profile picture`} 
            />
          </div>
          <div className="text-center sm:text-left mt-4 sm:mt-0">
            <h1 className="text-3xl font-bold text-slate-800">{profileData.name}</h1>
            <p className="text-md font-medium text-slate-500 mt-1">{profileData.degree} - <span className="text-indigo-600">{profileData.expertise}</span></p>
            <div className="mt-3">
              <span className="inline-block bg-slate-100 text-slate-700 text-sm font-semibold px-4 py-1.5 rounded-full">
                {profileData.experience} of Experience
              </span>
            </div>
          </div>
        </div>

        <hr className="my-8 border-t border-slate-200" />

        {/* --- About Section --- */}
        <div>
          <h2 className="text-xl font-bold text-slate-800">About Me</h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            {profileData.about}
          </p>
        </div>
        
        <hr className="my-8 border-t border-slate-200" />
        
        {/* --- Details Section --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Address */}
          <div>
            <h3 className="text-lg font-semibold text-slate-800 flex items-center">
              {/* <MapPinIcon className="w-5 h-5 mr-2 text-slate-400" /> */}
              Address
            </h3>
            <div className="mt-2 text-slate-600">
              <p>{ edit ? <input type="text" id="" onChange={(e) => setProfileData(prev => ({...prev, address:{...prev.address,line1:e.target.value}}))} value={profileData.address.line1}/>: profileData.address.line1}</p>
              <p>{edit ? <input type="text" id="" onChange={(e) => setProfileData(prev => ({...prev, address:{...prev.address,line2:e.target.value}}))} value={profileData.address.line2}/>: profileData.address.line2}</p>
            </div>
          </div>
          
          {/* Appointment Fee */}
          <div>
            <h3 className="text-lg font-semibold text-slate-800">Appointment Fee</h3>
            <p className="mt-2 text-3xl font-bold text-indigo-600">
              {currency} {edit ? <input type="number" id="" onChange={(e) => setProfileData(prev => ({...prev, fees :e.target.value}))} value={profileData.fees}/> : profileData.fees}
            </p>
          </div>
        </div>
        
        <hr className="my-8 border-t border-slate-200" />

        {/* --- Actions & Status --- */}
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          {/* Availability Toggle */}
          <div className="flex items-center">
            <input 
            onChange={(e) => setProfileData(prev => ({...prev, available: !prev.available}))}
            checked = {profileData.available}
              type="checkbox" 
              id="availability"
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer" 
            />
            <label htmlFor="availability" className="ml-3 block text-md font-medium text-slate-700 cursor-pointer">
              Available for Appointments
            </label>
          </div>
          
          {/* Edit Button */}
          
          {
           edit
           ? <button onClick={updateProfile} className="flex items-center justify-center w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300">
            {/* <PencilSquareIcon className="w-5 h-5 mr-2" /> */}
            Save Changes
          </button> : <button onClick={() => setEdit(true)} className="flex items-center justify-center w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300">
            {/* <PencilSquareIcon className="w-5 h-5 mr-2" /> */}
            Edit Profile
          </button>
          }
        </div>
        
      </div>
    </div>
  );
};

export default DoctorProfile;