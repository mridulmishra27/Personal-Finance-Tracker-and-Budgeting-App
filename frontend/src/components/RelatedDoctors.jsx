import React, { useContext, useEffect, useState } from 'react'; 
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const RelatedDoctors = ({ expertise, docid }) => {
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();
  const [relDoc, setRelDoc] = useState([]);

  useEffect(() => {
    if (doctors.length > 0 && expertise) {
      const doctorsData = doctors.filter((doc) => doc.expertise === expertise && doc._id !== docid);
      setRelDoc(doctorsData);
    }
  }, [doctors, expertise, docid]);

  // Render nothing if there are no related doctors to show
  if (relDoc.length === 0) {
    return null;
  }

  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-800 md:mx-10'> {/* Fixed: my-15 to my-16 */}
      <h1 className='text-3xl font-bold'>Related Doctors</h1>
      <p className='w-full px-4 md:w-1/2 lg:w-1/3 text-center text-gray-600'>
        Here are some other top-rated specialists in {expertise}.
      </p>
      {/* Fixed: Replaced invalid 'grid-cols-auto' with a responsive grid */}
      <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pt-5 px-3 sm:px-0'>
        {relDoc.slice(0, 5).map((doctor) => (
          <div
            onClick={() => {navigate(`/appointments/${doctor._id}`); scrollTo(0,0)}}
            className='border border-slate-200 bg-white rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 hover:shadow-xl transition-all duration-300 group'
            key={doctor._id} 
          >
            {/* Added classes for consistent image sizing */}
            <div className='w-full h-48 bg-blue-50 overflow-hidden'>
               <img className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300' src={doctor.image} alt={doctor.name} />
            </div>
            <div className='p-4'>
              <div className={`flex items-center gap-2 text-sm text-center ${doctor.available ? 'text-green-500' : 'text-red-500'} `}>
                              <p className={`w-2 h-2 ${doctor.available ? 'bg-green-500 ' : 'bg-gray-500'} rounded-full`}></p><p>{doctor.available ? 'Available' : 'Unavailable'}</p>
                         </div>
              <p className='text-gray-800 text-lg font-semibold mt-1'>{doctor.name}</p>
              <p className='text-gray-500 text-sm'>{doctor.expertise}</p>
            </div>
          </div>
        ))}
      </div>
      <button onClick={() => {navigate('/doctors'); scrollTo(0,0)}} className='bg-blue-100 text-gray-700 px-12 py-3 rounded-full mt-10'>View more...</button>
    </div>
  );
};

export default RelatedDoctors;