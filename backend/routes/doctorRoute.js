import express from 'express'
import { doctorlist, docLogin, docAppointments, appointmentCancel, appointmentComplete, docDashboard, docProfile, updateDocProfie } from '../controllers/doctorController.js'
import authDoc from '../middlewares/authDoc.js'


const doctorRouter = express.Router()

doctorRouter.get('/list', doctorlist)
doctorRouter.post('/login', docLogin)
doctorRouter.get('/appointments', authDoc, docAppointments)
doctorRouter.post('/complete-appointment', authDoc, appointmentComplete)
doctorRouter.post('/cancel-appointment', authDoc, appointmentCancel)
doctorRouter.get('/dashboard', authDoc, docDashboard)
doctorRouter.get('/profile', authDoc, docProfile)
doctorRouter.post('/update-profile', authDoc, updateDocProfie)

export default doctorRouter