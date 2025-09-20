import { createContext, useState } from "react";
import axios from 'axios'
import {toast} from 'react-toastify'

export const AdminContext = createContext()

const AdminContextProvider = (props) => {

    const [atoken, setAtoken] = useState(localStorage.getItem('atoken') ? localStorage.getItem('atoken') : '')
    const [doctors, setDoctors] = useState([])
    const [appointments, setAppointments] = useState([])
    const [dashData, setDashData] = useState(false)

    const backend = import.meta.env.VITE_BACKEND_URL

    const getDoctors = async () => {
        try {
            const {data} = await axios.post(backend + '/api/admin/doc-list', {}, {headers:{atoken}})
            if (data.success) {
                setDoctors(data.doctors)
                console.log(data.doctors);
                
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(data.message)
        }
    }

    const changeAvailability = async (docid) => {
        try {
            const {data} = await axios.post(backend + '/api/admin/change-availability', {docid}, {headers:{atoken}})

            if (data.success) {
                toast.success(data.message)
                getDoctors()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(data.message)
        }
    }
    // get appointments

    const getAppointments = async () => {
        try {
            const {data} = await axios.get(backend + '/api/admin/appointments', {headers:{atoken}})
            if (data.success) {
                setAppointments(data.appointments)
                console.log(data.appointments);
                
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(data.message)
        }
    }
    // cancel Appointment
    const appointmentCancellation = async (appointmentid) => {
        try {
            const {data} = await axios.post(backend + '/api/admin/cancel-appointment', {appointmentid}, {headers:{atoken}})
            if (data.success) {
                toast.success(data.message)
                getAppointments()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(data.message)
        }
    }
    //get dashboard data

    const getDashData = async () => {
        try {
            const {data} = await axios.get(backend + '/api/admin/dashboard', {headers:{atoken}})
            if (data.success) {
                setDashData(data.dashData)
                console.log(data.dashData);
                
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(data.message)
        }
    }

    const val = {
        atoken, setAtoken,
        backend, doctors,
        getDoctors, changeAvailability,
        appointments, setAppointments,
        getAppointments,
        appointmentCancellation,
        dashData, getDashData
    }

    return (
        <AdminContext.Provider  value={val}>
        {props.children}
        </AdminContext.Provider>
    )

}

export default AdminContextProvider