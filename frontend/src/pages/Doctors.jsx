import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
// import { Search, Stethoscope, X } from 'lucide-react'; // Using lucide-react for icons

// A more comprehensive list for demonstration
const expertiseList = [
  "General Physician",
  "Gynecologist",
  "Pediatricians",
  "Dermatologist",
  "Neurologist",
  "Cardiologist",
  "Endocrinologist",
];

const Doctors = () => {
  const navigate = useNavigate();
  const { expertise } = useParams();
  const { doctors } = useContext(AppContext);

  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Combined filtering logic for both expertise and search term
  useEffect(() => {
    let result = doctors;

    // 1. Filter by expertise from URL parameter
    if (expertise) {
      result = result.filter(doc => doc.expertise.toLowerCase() === expertise.toLowerCase());
    }

    // 2. Filter by search term from input
    if (searchTerm) {
      result = result.filter(doc =>
        doc.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredDoctors(result);
  }, [doctors, expertise, searchTerm]);

  const handleExpertiseClick = (exp) => {
    // Navigate to the new expertise filter URL
    navigate(`/doctors/${exp}`);
  };

  const clearFilters = () => {
    setSearchTerm('');
    navigate('/doctors');
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 tracking-tight">
            Find and Book Your Doctor
          </h1>
          <p className="text-lg text-slate-500 mt-3 max-w-2xl mx-auto">
            Search by name or filter by specialty to find the right healthcare professional for you.
          </p>
        </header>

        {/* Search and Filter Section */}
        <div className="mb-10 space-y-6">
          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto">
            {/* <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} /> */}
            <input
              type="text"
              placeholder="Search by doctor's name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-full shadow-sm focus:ring-2 focus:ring-teal-500 focus:outline-none transition"
            />
          </div>
          
          {/* Expertise Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
            <button
              onClick={clearFilters}
              className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${!expertise && !searchTerm ? 'bg-teal-600 text-white shadow-md' : 'bg-white text-slate-700 hover:bg-slate-100 shadow-sm border border-slate-200'}`}
            >
              All
            </button>
            {expertiseList.map((exp, idx) => (
              <button
                key={idx}
                onClick={() => handleExpertiseClick(exp)}
                className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${expertise === exp ? 'bg-teal-600 text-white shadow-md' : 'bg-white text-slate-700 hover:bg-slate-100 shadow-sm border border-slate-200'}`}
              >
                {exp}
              </button>
            ))}
          </div>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor) => (
              <div
                key={doctor._id}
                onClick={() => navigate(`/appointments/${doctor._id}`)}
                className="bg-white rounded-2xl shadow-lg border border-slate-200/80 overflow-hidden cursor-pointer group transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="p-6 text-center">
                  <div className="relative inline-block">
                    <img
                      className="w-28 h-28 rounded-full object-cover ring-4 ring-slate-100 group-hover:ring-teal-100 transition-all"
                      src={doctor.image}
                      alt={doctor.name}
                    />
                    <span className={`absolute bottom-1 right-2 block h-4 w-4 rounded-full border-2 border-white ${doctor.available ? 'bg-green-500' : 'bg-red-500'}`}></span>
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-slate-800">{doctor.name}</h3>
                  <p className="text-teal-600 font-medium mt-1">{doctor.expertise}</p>
                  
                  <div className={`mt-3 inline-flex items-center gap-2 text-sm font-semibold px-3 py-1 rounded-full ${doctor.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {doctor.available ? 'Available Now' : 'Unavailable'}
                  </div>
                </div>
                <div className="bg-slate-50/70 p-4">
                   <button className="w-full text-center font-semibold text-teal-700 group-hover:text-teal-500 transition">
                    Book Appointment
                   </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              {/* <Stethoscope className="mx-auto text-slate-400" size={64} /> */}
              <h3 className="mt-4 text-2xl font-semibold text-slate-700">No Doctors Found</h3>
              <p className="text-slate-500 mt-2">Try adjusting your search or filter criteria.</p>
              <button
                onClick={clearFilters}
                className="mt-6 px-5 py-2.5 bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 transition"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Doctors;