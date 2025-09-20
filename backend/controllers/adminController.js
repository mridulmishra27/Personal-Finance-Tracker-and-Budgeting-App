import validator from 'validator'
import bcrypt from 'bcrypt'
import { v2 as cloudinary} from 'cloudinary'
import docModel from '../models/doctorModel.js'
import jwt  from 'jsonwebtoken'
import appointmentModel from '../models/appointmentModel.js'
import userModel from '../models/userModel.js'

const addDoc = async (req, res) => {
    try {

        const { name, email, password, expertise, degree, experience, about, fees, address } = req.body
        const imageFile = req.file

        console.log({ name, email, password, expertise, degree, experience, about, fees, address }, imageFile);
        

        if (!name || !email || !password || !expertise || !degree || !experience || !about || !fees || !address) {
            return res.json({success: false, message:"Missing Details"})
        }

        if (!validator.isEmail(email)) {
            return res.json({success: false, message:"Enter Valid Email"})
        }

        if (password.length < 8) {
            return res.json({success: false, message:"Password must be of 8 characters"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type: "image"})
        const imageUrl = imageUpload.secure_url

        const docData = {
            name,
            email, 
            image:imageUrl,
            password:hashedPassword,
            expertise,
            degree,
            experience,
            fees,
            about,
            address:JSON.parse(address),
            date:Date.now()
        }

        const newDoc = new docModel(docData)
        await newDoc.save()

        res.json({success: true, message:"Doctor Created"})

    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

const logAdmin = async (req, res) => {
    try {
        const{email, password} = req.body

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            
            const token = jwt.sign(email+password, process.env.JWT_SECRET)
            res.json({success:true,token})

        } else {
            res.json({success:false, message:"Credential Mismatch"})
        }

    } catch (error) {

        console.log(error);
        res.json({success:false, message:error.message})
    }
}

// to get all doctors list

const allDoctors = async (req, res) => {
    try {

        const doctors = await docModel.find({}).select('-password')

        res.json({success:true, doctors})
        
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

// All Appointments list
const appointmentsAdmin = async (req, res) => {
    try {
        const appointments = await appointmentModel.find({})
        res.json({success:true, appointments})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
        
    }
}

// appointment cancellation
const appointmentCancellation = async (req, res) => {
  try {
    const {appointmentid} = req.body
    const appointmentData = await appointmentModel.findById(appointmentid)

    await appointmentModel.findByIdAndUpdate(appointmentid, {cancel: true})
    const {docid, slotDate, slotTime} = appointmentData

    const docData = await docModel.findById(docid)

    let slots_booked = docData.slots_booked
    slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)

    await docModel.findByIdAndUpdate(docid, {slots_booked})
    res.json({success: true, message:'Appointment Cancelled'})

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}
// dashboard data admin panel
const adminDashboard = async (req, res) => {
    try {
        const docs = await docModel.find({})
        const users = await userModel.find({})
        const appointments = await appointmentModel.find({})
        
        const dashData = {
            docs: docs.length,
            appointments : appointments.length,
            patients: users.length,
            latestAppointments: appointments.reverse().slice(0,5)
        }
        res.json({success:true, dashData})
    } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
    }
}

export {addDoc, logAdmin, allDoctors, appointmentsAdmin, appointmentCancellation, adminDashboard}