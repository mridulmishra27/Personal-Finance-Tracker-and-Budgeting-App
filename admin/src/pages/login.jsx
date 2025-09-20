import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify';
import { DoctorContext } from '../context/DoctorContext';

const Login = () => {

  const [state, setState] = React.useState("Admin")

  const[email, setEmail] = useState('')
  const[password, setPassword] = useState('')

  const {setAtoken, backend} = useContext(AdminContext)
  const {setDToken} = useContext(DoctorContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {
        if (state === 'Admin') {
            const {data} = await axios.post(backend + '/api/admin/log-admin', {email, password})
            if (data.success) {
                localStorage.setItem('atoken', data.token)
                setAtoken(data.token);
            } else {
              toast.error(data.message)
            }
        } else {
          const {data} = await axios.post(backend + '/api/doctor/login', {email, password})
          if (data.success) {
                localStorage.setItem('dtoken', data.dtoken)
                setDToken(data.dtoken);
                console.log(data.dtoken);
            } else {
              toast.error(data.message)
            }
        }
    } catch (error) {
        
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-xl shadow-lg min-w-[320px] flex flex-col gap-6">
        <p className="text-lg text-gray-800">
          <span className="font-bold text-blue-600">{state}</span> Login
        </p>
        <div className="flex flex-col gap-1">
          <label className="text-gray-700 text-sm">Email</label>
          <input
          onChange={(e) => setEmail(e.target.value)} value={email}
            type="email"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-gray-700 text-sm">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)} value={password}
            type="password"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition"
        >
          Login
        </button>
        {
            state === 'Admin'
            ? <p> Doctor Login <span className='text-blue-400 underline cursor-pointer' onClick={() => setState('Doctor')}>Click Here</span></p>
            : <p> Admin Login <span className='text-blue-400 underline cursor-pointer' onClick={() => setState('Admin')}>Click Here</span></p>
        }
      </div>
    </form>
  );
};

export default Login;
