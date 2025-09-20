import { useState } from "react";
import { createContext } from "react";
import axios from 'axios'
import {toast} from 'react-toastify'

export const DoctorContext = createContext()

const DoctorContextProvider = (props) => {

    const backend = import.meta.env.VITE_BACKEND_URL
    const [dtoken, setDToken] = useState(localStorage.getItem('dtoken') ? localStorage.getItem('dtoken') : '')
    const [appointments, setAppointments] = useState([])
    const [dashData, setDashData] = useState(false)
    const [profileData, setProfileData] = useState(false)

    const getAppointments = async () => {
        try {
            const {data} = await axios.get(backend + '/api/doctor/appointments', {headers:{dtoken}})
            if (data.success) {
                setAppointments(data.appointments)
                console.log(data.appointments);
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    const completeAppointment = async (appointmentid) => {
        try {
            const {data} = await axios.post(backend + '/api/doctor/complete-appointment', {appointmentid}, {headers:{dtoken}})
            if (data.success) {
                toast.success(data.message)
                getAppointments()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(data.message)
        }
    }
    
    const cancelAppointment = async (appointmentid) => {
        try {
            const {data} = await axios.post(backend + '/api/doctor/cancel-appointment', {appointmentid}, {headers:{dtoken}})
            if (data.success) {
                toast.success(data.message)
                getAppointments()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(data.message)
        }
    }

    const getDashData = async () => {
        try {
            const {data} = await axios.get(backend + '/api/doctor/dashboard', {headers:{dtoken}})
            if (data.success) {
                setDashData(data.dashData)
                console.log(data.dashData);
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(data.message)
        }
    }

    const getProfile = async () => {
        try {
            const {data} = await axios.get(backend + '/api/doctor/profile', {headers:{dtoken}})
            if (data.success) {
                setProfileData(data.profileData)
                console.log(data.profileData);
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(data.message)
        }
    }
    
    const val = {
        dtoken, setDToken,
        backend,
        appointments,setAppointments,
        getAppointments,
        completeAppointment,
        cancelAppointment,
        dashData, setDashData,
        getDashData,
        profileData, setProfileData,
        getProfile,
    }

    return (
        <DoctorContext.Provider  value={val}>
        {props.children}
        </DoctorContext.Provider>
    )

}

export default DoctorContextProvider