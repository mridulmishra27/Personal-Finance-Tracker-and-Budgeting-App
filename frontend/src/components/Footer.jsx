import React from 'react'
import { assets } from '../assets/assets'
import { FiPhone, FiMail } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-emerald-50 text-gray-700 mt-16 pt-12">
      {/* Main content */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:grid md:grid-cols-[3fr_1fr_1fr] gap-12 md:gap-14 text-sm">
          {/* Left */}
          <div className="flex flex-col gap-4">
            <img src={assets.admin_logo} alt="ClinicConnect Logo" className="w-36 mb-2"/>
            <p className="leading-relaxed">
              This ClinicConnect is a project made by a 3rd year BTech student please do not make any appointments as the doctors shown are only a demo doctors they do not any physical presence.
            </p>
          </div>
          {/* Center */}
          <div className="flex flex-col gap-3">
            <p className="font-semibold mb-2 text-emerald-700">COMPANY</p>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-emerald-600">Home</a></li>
              <li><a href="/about" className="hover:text-emerald-600">About Us</a></li>
              <li><a href="/contact" className="hover:text-emerald-600">Contact Us</a></li>
              {/* <li><a href="/privacy" className="hover:text-emerald-600">Privacy Policy</a></li> */}
            </ul>
          </div>
          {/* Right */}
          <div className="flex flex-col gap-3">
            <p className="font-semibold mb-2 text-emerald-700">GET IN TOUCH</p>
            <ul className="space-y-2">
              <li className="flex items-center gap-3">
                <FiPhone className="text-emerald-600" size={18}/>
                <a href="tel:+911234567890" className="hover:text-emerald-600">+91 1234567890</a>
              </li>
              <li className="flex items-center gap-3">
                <FiMail className="text-emerald-600" size={18}/>
                <a href="mailto:rahul8888saxena@gmail.com" className="hover:text-emerald-600">rahul8888saxena@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* Divider & Copyright */}
      <div className="max-w-6xl mx-auto px-4">
        <hr className="border-t border-emerald-200 mt-8"/>
        <p className="text-center text-xs text-gray-500">
            © {new Date().getFullYear()} ClinicConnect Inc. All Rights Reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
