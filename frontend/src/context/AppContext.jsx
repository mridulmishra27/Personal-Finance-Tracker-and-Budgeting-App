import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currency = "₹";
  const backend = import.meta.env.VITE_BACKEND_URL;

  const [usertoken, setUserToken] = useState(localStorage.getItem('usertoken') ? localStorage.getItem('usertoken') : false);
  const [userData, setUserData] = useState(false)


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
    currency,
    usertoken,
    setUserToken,
    backend,
    userData,setUserData,
    profileData
  };


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
