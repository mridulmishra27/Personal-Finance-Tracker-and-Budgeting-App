import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate()
  const {backend, usertoken, setUserToken} = useContext(AppContext)
  const [state, setState] = useState('Register');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    // handle login/register logic here
    try {
      if (state === 'Register') {

        const {data} = await axios.post(backend + '/api/user/register', {name, password, email})
        if (data.success) {
          localStorage.setItem('usertoken', data.usertoken)
          setUserToken(data.usertoken)
        } else {
          toast.error(data.message)
        }

      } else {
        const {data} = await axios.post(backend + '/api/user/login', {password, email})
        if (data.success) {
          localStorage.setItem('usertoken', data.usertoken)
          setUserToken(data.usertoken)
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (usertoken) {
      navigate('/')
    }
  }, [usertoken])

  return (
    <div className="rounded-3xl min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200">
      <form
        onSubmit={onSubmitHandler}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-2">
          {state === 'Register' ? 'Register Now' : 'Login'}
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Please {state === 'Register' ? 'sign up' : 'log in'} to book your appointment
        </p>
        
        {state === 'Register' && (
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Enter your name"
              required
            />
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
            placeholder="Enter your password"
            required
          />
        </div>

        <button
          type="submit"
          className="rounded-full w-full bg-purple-600 hover:bg-purple-700 transition-colors text-white font-semibold py-2"
        >
          {state === 'Register' ? 'Sign Up' : 'Log In'}
        </button>
        
        <div className="mt-6 text-center">
          {state === 'Register' ? (
            <span className="text-gray-700">
              Already have an account?{' '}
              <button
                type="button"
                className="text-purple-600 hover:underline"
                onClick={() => setState('Login')}
              >
                Log In
              </button>
            </span>
          ) : (
            <span className="text-gray-700">
              New here?{' '}
              <button
                type="button"
                className="text-purple-600 hover:underline"
                onClick={() => setState('Register')}
              >
                Register
              </button>
            </span>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
