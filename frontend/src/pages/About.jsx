import React from 'react'
import { assets } from '../assets/assets'

const reasons = [
  {
    title: "EFFICIENCY",
    description: "Streamlined appointment scheduling that fits into your busy lifestyle.",
    icon: (
      // SVG calendar icon
      <svg className="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <rect x="3" y="6" width="18" height="15" rx="3" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 2v4M8 2v4M3 10h18" />
      </svg>
    )
  },
  {
    title: "CONVENIENCE",
    description: "Access to a network of trusted healthcare professionals in your area.",
    icon: (
      // SVG location icon
      <svg className="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M12 21s8-7.58 8-12A8 8 0 1 0 4 9c0 4.42 8 12 8 12z" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
    )
  },
  {
    title: "PERSONALIZATION",
    description: "Tailored recommendations and reminders to help you stay on top of your health.",
    icon: (
      // SVG user star icon
      <svg className="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" strokeWidth="1.3" viewBox="0 0 24 24">
        <circle cx="12" cy="8" r="4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 21v-1a4 4 0 0 1 4-4h1" />
        <path d="M20 17v-1.5l-1 .5-1-.5V17l.6.5-1 .8.4 1.2L19 19l1-.5.4-1.2-1-.8z" />
      </svg>
    )
  }
]

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white pt-14 pb-20 px-4">
      {/* Main About Card */}
      <div className="bg-white max-w-4xl mx-auto rounded-3xl shadow-2xl p-7 md:p-14 flex flex-col gap-10">
        {/* Header */}
        <div className="text-center space-y-2">
          <p className="text-sm font-semibold text-blue-500 tracking-widest">ABOUT US</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Welcome to <span className="text-blue-500">ClinicConnect</span>
          </h2>
          <div className="mx-auto w-16 h-1 rounded bg-gradient-to-r from-blue-400 to-blue-800 my-2" />
        </div>
        {/* Main About Content */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-12">
          {/* Image */}
          <img 
            className="w-full md:max-w-xs rounded-xl shadow-lg object-cover" 
            src={assets.about_img}
            alt="About ClinicConnect"
          />
          {/* Text Content */}
          <div className="flex-1 space-y-6 text-gray-700 text-base leading-relaxed">
            <p>
              Welcome to <b className="text-blue-500">ClinicConnect</b>, your trusted partner in managing your healthcare needs conveniently and efficiently.
              At ClinicConnect, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.
            </p>
            <p>
              <b className="text-gray-900 font-medium">ClinicConnect</b> is committed to excellence in healthcare technology.
              We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service.
              Whether you're booking your first appointment or managing ongoing care, we're here to support you every step of the way.
            </p>
            {/* Divider */}
            <div className="border-t mt-4 mb-2 border-blue-100" />
            {/* Vision Section */}
            <div>
              <h3 className="text-lg font-bold mb-2 text-gray-800">Our Vision</h3>
              <p>
                Our vision at <b className="text-blue-500">ClinicConnect</b> is to create a seamless healthcare experience for every user.
                We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* WHY CHOOSE US Section */}
      <div className="max-w-5xl mx-auto mt-20">
        <div className="flex flex-col items-center space-y-2 mb-8">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900">WHY <span className="text-blue-600 font-bold">CHOOSE US</span></h3>
          <div className="w-14 h-1 rounded bg-gradient-to-r from-blue-400 to-blue-800" />
        </div>
        <div className="flex flex-col md:flex-row gap-8 md:gap-6">
          {reasons.map((reason, idx) => (
            <div
              key={idx}
              className="flex-1 bg-white rounded-xl shadow-md flex flex-col items-center text-center px-6 py-8 gap-3 transition-transform hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-2">{reason.icon}</div>
              <h4 className="text-lg font-semibold text-gray-800 tracking-wide">{reason.title}</h4>
              <p className="text-gray-500 text-sm">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default About
