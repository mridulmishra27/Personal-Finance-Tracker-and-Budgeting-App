import  express  from "express"
import { addDoc, adminDashboard, allDoctors, appointmentCancellation, appointmentsAdmin, logAdmin } from '../controllers/adminController.js'
import upload from "../middlewares/multer.js"
import authAdmin from "../middlewares/authAdmin.js"
import { changeAvailability } from "../controllers/doctorController.js"

const adminRouter = express.Router()

adminRouter.post('/add-doc', authAdmin, upload.single('image'), addDoc)
adminRouter.post('/log-admin', logAdmin)
adminRouter.post('/doc-list',authAdmin, allDoctors)
adminRouter.post('/change-availability',authAdmin, changeAvailability)
adminRouter.get('/appointments',authAdmin, appointmentsAdmin)
adminRouter.post('/cancel-appointment',authAdmin, appointmentCancellation)
adminRouter.get('/dashboard',authAdmin, adminDashboard)

export default adminRouter