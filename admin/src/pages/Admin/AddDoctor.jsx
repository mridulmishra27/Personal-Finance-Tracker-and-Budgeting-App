import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from 'axios'

const AddDoctor = () => {

  const[docimg, setdocimg] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [exp, setExp] = useState('1 Year')
  const [fees, setFees] = useState('')
  const [about, setAbout] = useState('')
  const [expertise, setExpertise] = useState('General Physician')
  const [degree, setDegree] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')

  const {backend, atoken} = useContext(AdminContext)

  const onsubmitHandler = async (event) => {
    event.preventDefault()

    try {
      if (!docimg) {
        return toast.error('Image not selected')
      }

      const formData = new FormData()

      formData.append('image', docimg)
      formData.append('name', name)
      formData.append('email', email)
      formData.append('password', password)
      formData.append('expertise', expertise)
      formData.append('experience', exp)
      formData.append('fees', Number(fees))
      formData.append('about', about)
      formData.append('degree', degree)
      formData.append('address', JSON.stringify({line1: address1, line2:address2}))

      formData.forEach((value, key) => {
        console.log(`${key} : ${value}`);
      });

      const {data} = await axios.post(backend + '/api/admin/add-doc', formData, {headers:{atoken}})

      if (data.success) {
        toast.success(data.message)

        setdocimg(false)
        setAbout('')
        setAddress1('')
        setAddress2('')
        setDegree('')
        setEmail('')
        setFees('')
        setName('')
        setPassword('')

      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
      console.log(error);
      
    }
  }

  return (
    <form onSubmit={onsubmitHandler} className="m-5 w-full mx-auto p-6 bg-white rounded-lg shadow-md">
      <p className="text-2xl font-semibold mb-6 text-gray-800">Add Doctor</p>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Upload Image Section */}
        <div className="flex flex-col items-center">
          <label
            htmlFor="doc-img"
            className="flex items-center justify-center w-24 h-24 border-2 border-dashed border-gray-300 rounded-full cursor-pointer hover:border-blue-500 transition-colors"
          >
            <img
              src={docimg? URL.createObjectURL(docimg) : assets.upload_area}
              alt="Upload"
              className="w-20 h-20 object-cover rounded-full"
            />
            <input onChange={(e)=> setdocimg(e.target.files[0])} type="file" id="doc-img" hidden />
          </label>
          <p className="mt-2 text-center text-gray-500 text-xs leading-tight select-none pointer-events-none">
            Upload Doctor's
            <br />
            Picture
          </p>
        </div>
        {/* Form Inputs Section */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Doctor Name */}
          <div>
            <label
              className="block mb-1 text-gray-700 font-medium"
              htmlFor="doctorName"
            >
              Doctor Name
            </label>
            <input
            onChange={(e) => setName(e.target.value)}
            value={name}
              id="doctorName"
              type="text"
              placeholder="Name"
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Doctor Email */}
          <div>
            <label
              className="block mb-1 text-gray-700 font-medium"
              htmlFor="doctorEmail"
            >
              Doctor Email
            </label>
            <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
              id="doctorEmail"
              type="email"
              placeholder="Email"
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Doctor Password */}
          <div>
            <label
              className="block mb-1 text-gray-700 font-medium"
              htmlFor="doctorPassword"
            >
              Doctor Password
            </label>
            <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
              id="doctorPassword"
              type="password"
              placeholder="Password"
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Experience */}
          <div>
            <label
              className="block mb-1 text-gray-700 font-medium"
              htmlFor="experience"
            >
              Experience
            </label>
            <select
            onChange={(e) => setExp(e.target.value)}
            value={exp}
              id="experience"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="1 Year">1 Year</option>
              <option value="2 Year">2 Year</option>
              <option value="3 Year">3 Year</option>
              <option value="4 Year">4 Year</option>
              <option value="5 Year">5 Year</option>
              <option value="6 Year">6 Year</option>
              <option value="7 Year">7 Year</option>
              <option value="8 Year">8 Year</option>
              <option value="9 Year">9 Year</option>
              <option value="10 Year">10 Year</option>
              <option value="10+ Year">10+ Year</option>
            </select>
          </div>

          {/* Fees */}
          <div>
            <label
              className="block mb-1 text-gray-700 font-medium"
              htmlFor="fees"
            >
              Fees
            </label>
            <input
            onChange={(e) => setFees(e.target.value)}
            value={fees}
              id="fees"
              type="number"
              placeholder="Fees"
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Expertise */}
          <div>
            <label
              className="block mb-1 text-gray-700 font-medium"
              htmlFor="expertise"
            >
              Expertise
            </label>
            <select
            onChange={(e) => setExpertise(e.target.value)}
            value={expertise}
              id="expertise"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="General Physician">General Physician</option>
              <option value="Gynecologist">Gynecologist</option>
              <option value="Dermatologist">Dermatologist</option>
              <option value="Pediatricians">Pediatricians</option>
              <option value="Cardiologist">Cardiologist</option>
              <option value="Gynecologist">Gynecologist</option>
              <option value="Orthopedic Surgeon">Orthopedic Surgeon</option>
              <option value="Dentist">Dentist</option>
              <option value="ENT">ENT</option>
              <option value="Neurologist">Neurologist</option>
              <option value="Endocrinologist">Endocrinologist</option>
              <option value="Gastroenterologist">Gastroenterologist</option>
            </select>
          </div>

          {/* Education */}
          <div>
            <label
              className="block mb-1 text-gray-700 font-medium"
              htmlFor="education"
            >
              Education
            </label>
            <input
            onChange={(e) => setDegree(e.target.value)}
            value={degree}
              id="education"
              type="text"
              placeholder="Education"
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Address Lines in same row for large screens */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label
                className="block mb-1 text-gray-700 font-medium"
                htmlFor="address1"
              >
                Address Line 1
              </label>
              <input
              onChange={(e) => setAddress1(e.target.value)}
            value={address1}
                id="address1"
                type="text"
                placeholder="Address Line 1"
                required
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex-1">
              <label
                className="block mb-1 text-gray-700 font-medium"
                htmlFor="address2"
              >
                Address Line 2
              </label>
              <input
              onChange={(e) => setAddress2(e.target.value)}
            value={address2}
                id="address2"
                type="text"
                placeholder="Address Line 2"
                required
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* About the Doctor (full width) */}
          <div className="lg:col-span-2">
            <label
              className="block mb-1 text-gray-700 font-medium"
              htmlFor="aboutDoctor"
            >
              About the Doctor
            </label>
            <textarea
            onChange={(e) => setAbout(e.target.value)}
            value={about}
              id="aboutDoctor"
              placeholder="Write about the Doctor"
              rows={5}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Button - now styled small and below grid */}
        </div>
      </div>
      <div className="flex justify-end mt-6">
        <button
          type="submit"
          className="w-auto bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors"
        >
          Add Doctor
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;