import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import {assets} from '../assets/assets'
import axios from 'axios';
import { toast } from 'react-toastify';
const Profile = () => {
  const { userData, setUserData, backend, usertoken, profileData } = useContext(AppContext);

  const [edit, setEdit] = useState(false);
  const [image, setImage] = useState(false)
  const updateProfile = async () => {
    try {
      const formData = new FormData()
      formData.append('name', userData.name)
      formData.append('phone', userData.phone)
      formData.append('address', JSON.stringify(userData.address))
      formData.append('gender', userData.gender)
      formData.append('dob', userData.dob)
      image && formData.append('image', image)

      const {data} = await axios.post(backend + '/api/user/update-profile', formData, {headers:{usertoken}})

      if (data.success) {
        toast.success(data.message)
        await profileData()
        setEdit(false)
        setImage(false)
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  // loading check. If userData is not yet loaded, show a message.
  if (!userData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl">Loading Profile...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto my-12 p-6 bg-white rounded-2xl shadow-lg">

      {
        edit ?
        <label htmlFor='image'>
          <div className='inline-block relative cursor-pointer'>
            <img className='w-36 rounded opacity-75' src={image ? URL.createObjectURL(image) : userData.image} alt="" />
            <img className='w-10 absolute bottom-12 right-12' src={image ? '' : assets.upload_icon} alt="" />
          </div>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden />
        </label>
        :
        <img
          src={userData.image}
          alt="Profile"
          className="w-32 h-32 object-cover rounded-full border-4 border-purple-600"
        />
      }

        {edit ? (
          <input
            type="text"
            value={userData.name} 
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, name: e.target.value })) 
            }
            className="text-center text-2xl font-semibold border-b-2 border-purple-600 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-400 rounded-md"
          />
        ) : (
          <p className="text-2xl font-semibold text-gray-800">{userData.name}</p> 
        )}

      <hr className="my-8 border-purple-300" />

      {/* Contact Information */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-purple-700 border-b-2 border-purple-600 pb-1">
          CONTACT INFORMATION
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div>
            <p className="font-semibold text-gray-700">Email:</p>
            <p className="text-gray-900">{userData.email}</p> {/* FIX 2 */}
          </div>

          <div>
            <p className="font-semibold text-gray-700">Phone:</p>
            {edit ? (
              <input
                type="text"
                value={userData.phone} // FIX 2
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, phone: e.target.value })) // FIX 2
                }
                className="w-full border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            ) : (
              <p className="text-gray-900">{userData.phone}</p> // FIX 2
            )}
          </div>

          <div className="md:col-span-2">
            <p className="font-semibold text-gray-700">Address:</p>
            {edit ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={userData.address.line1} // FIX 2
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value },
                    })) // FIX 2
                  }
                  className="w-full border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  placeholder="Address Line 1"
                />
                <input
                  type="text"
                  value={userData.address.line2} // FIX 2
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value },
                    })) // FIX 2
                  }
                  className="w-full border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  placeholder="Address Line 2"
                />
              </div>
            ) : (
              <p className="text-gray-900 whitespace-pre-line">
                {userData.address.line1} {/* FIX 2 */}
                {'\n'}
                {userData.address.line2} {/* FIX 2 */}
              </p>
            )}
          </div>
        </div>
      </section>

      <hr className="my-8 border-purple-300" />

      {/* Basic Information */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-purple-700 border-b-2 border-purple-600 pb-1">
          BASIC INFORMATION
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 items-center">
          <div>
            <p className="font-semibold text-gray-700 mb-1">Gender:</p>
            {edit ? (
              <select
                value={userData.gender} // FIX 2
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, gender: e.target.value })) // FIX 2
                }
                className="w-full border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-400"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <p className="text-gray-900">{userData.gender}</p> // FIX 2
            )}
          </div>

          <div>
            <p className="font-semibold text-gray-700 mb-1">Birthday:</p>
            {edit ? (
              <input
                type="date"
                value={userData.dob} // FIX 2
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, dob: e.target.value })) // FIX 2
                }
                className="w-full border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            ) : (
              <p className="text-gray-900">{userData.dob}</p> // FIX 2
            )}
          </div>
        </div>
      </section>

      {/* Action button */}
      <div className="mt-10 text-center">
        {edit ? (
          <button
            onClick={updateProfile}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded-full transition"
          >
            Save Information
          </button>
        ) : (
          <button
            onClick={() => setEdit(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded-full transition"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;