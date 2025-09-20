import React from 'react';
import { assets } from '../assets/assets';

const Contact = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center px-4 py-12 md:px-24 bg-gray-50 min-h-screen gap-12">
      
      {/* Image on the left */}
      <div className="w-full md:w-1/2 flex justify-center">
        <img
          src={assets.contact_img}
          alt="Contact ClinicConnect office"
          className="rounded-xl shadow-lg w-full h-80 object-cover"
        />
      </div>

      {/* Info on the right */}
      <div className="rounded-xl px-8 py-8 w-full md:w-1/2 flex flex-col gap-5 text-gray-700">
        <div>
          <p className="font-bold text-lg text-indigo-700 tracking-widest mb-2">
            OUR OFFICE
          </p>
          <p className="mb-1">
            1234 lorem ipsum
            <br />
            Lorem 567, lorem, ipsum
          </p>
          <p className="mb-1">
            <span className="font-semibold text-gray-600">Tel:</span> (415) 555-1234
            <br />
            <span className="font-semibold text-gray-600">Email:</span>{' '}
            <a
              className="text-indigo-700 underline"
              href="mailto:support@ClinicConnect.com"
            >
              lorem@ispum.com
            </a>
          </p>
        </div>
        <div>
          <p className="font-semibold text-indigo-700 text-base mb-1">
            CAREERS AT ClinicConnect
          </p>
          <p className="mb-3 text-sm text-gray-600">
            Learn more about our teams and job openings.
          </p>
          <button
            className="bg-indigo-700 hover:bg-indigo-800 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
          >
            Explore Jobs
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
