import { AdminContext } from '../context/AdminContext'
import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { DoctorContext } from '../context/DoctorContext';

const Sidebar = () => {
  const { atoken } = useContext(AdminContext);
  const { dtoken } = useContext(DoctorContext);

  const [isOpen, setIsOpen] = useState(true); // Toggle state

  return (
    <>
      {/* Toggle Button (visible only on mobile) */}
      <button
        className="md:hidden fixed -translate-y-1/2 z-50 p-2 rounded-lg shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        <img
          src={assets.menu_icon}
          alt="Toggle Menu"
          className={`w-6 h-6 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
        />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 h-full w-64 bg-white shadow-2xl rounded-r-3xl p-6 flex flex-col justify-start transition-transform duration-300 z-40
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
      >
        {atoken && (
          <ul className="flex flex-col space-y-4">
            <NavLink onClick={() => setIsOpen(false)} to={'/admin-dashboard'}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition-all font-medium text-base ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                }`}>
              <img src={assets.home_icon} alt="Dashboard" className="w-6 h-6" />
              <span>Dashboard</span>
            </NavLink>

            <NavLink onClick={() => setIsOpen(false)} to={'/all-appointments'}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition-all font-medium text-base ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                }`}>
              <img src={assets.appointment_icon} alt="Appointment" className="w-6 h-6" />
              <span>Appointment</span>
            </NavLink>

            <NavLink onClick={() => setIsOpen(false)} to={'/add-doc'}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition-all font-medium text-base ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                }`}>
              <img src={assets.add_icon} alt="Add Doctor" className="w-6 h-6" />
              <span>Add Doctor</span>
            </NavLink>

            <NavLink onClick={() => setIsOpen(false)} to={'/doc-list'}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition-all font-medium text-base ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                }`}>
              <img src={assets.people_icon} alt="Doctor List" className="w-6 h-6" />
              <span>Doctor List</span>
            </NavLink>
          </ul>
        )}

        {dtoken && (
          <ul className="flex flex-col space-y-4">
            <NavLink onClick={() => setIsOpen(false)} to={'/doc-dashboard'}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition-all font-medium text-base ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                }`}>
              <img src={assets.home_icon} alt="Dashboard" className="w-6 h-6" />
              <span>Dashboard</span>
            </NavLink>

            <NavLink onClick={() => setIsOpen(false)} to={'/doc-appointments'}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition-all font-medium text-base ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                }`}>
              <img src={assets.appointment_icon} alt="Appointment" className="w-6 h-6" />
              <span>Appointments</span>
            </NavLink>

            <NavLink onClick={() => setIsOpen(false)} to={'/doc-profile'}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition-all font-medium text-base ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                }`}>
              <img src={assets.people_icon} alt="Doctor List" className="w-6 h-6" />
              <span>Profile</span>
            </NavLink>
          </ul>
        )}
      </div>
    </>
  );
};

export default Sidebar;
