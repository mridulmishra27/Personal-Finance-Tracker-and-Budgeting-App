import { createContext, useEffect, useState } from "react";
// import { doctors } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currency = "₹";
  const backend = import.meta.env.VITE_BACKEND_URL;

  const [usertoken, setUserToken] = useState(localStorage.getItem('usertoken') ? localStorage.getItem('usertoken') : false);
  const [doctors, setDoctors] = useState([]);
  const [userData, setUserData] = useState(false)

  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(backend + "/api/doctor/list");
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const profileData = async () => {
    try {
      const {data} = await axios.get(backend + '/api/user/profile', {headers:{usertoken}})
      if (data.success) {
        setUserData(data.userdata)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  const value = {
    doctors, getDoctorsData,
    currency,
    usertoken,
    setUserToken,
    backend,
    userData,setUserData,
    profileData
  };

  useEffect(() => {
    getDoctorsData();
  }, []);

  useEffect(() => {
    if (usertoken) {
      profileData()
    } else {
      setUserData(false)
    }
  }, [usertoken]);

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
