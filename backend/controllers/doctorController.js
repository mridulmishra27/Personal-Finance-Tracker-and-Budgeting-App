import doctorModel from '../models/doctorModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import appointmentModel from '../models/appointmentModel.js'

const changeAvailability = async (req, res) => {
    try {

        const {docid} = req.body

        const docData = await doctorModel.findById(docid)
        await doctorModel.findByIdAndUpdate(docid, {available: !docData.available})
        res.json({success:true, message:'Availability Changed'})

    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

const doctorlist = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select(['-password', '-email'])
        res.json({success:true, doctors})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}
// doctor login
const docLogin = async (req, res) => {
    try {
        const {email, password} = req.body
        const doc = await doctorModel.findOne({email})

        if (!doc) {
            return res.json({success:false, message:'Credentials Mismatch'})
        }
        const matched = await bcrypt.compare(password, doc.password)

        if (matched) {
            const dtoken = jwt.sign({id:doc._id}, process.env.JWT_SECRET)
            res.json({success:true, dtoken})
        } else {
            return res.json({success:false, message:'Credentials Mismatch'})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}
// to get appointments of a single Doctor
const docAppointments = async (req, res) => {
    try {
        const docid = req.doc.id
        const appointments = await appointmentModel.find({docid})
        res.json({success:true, appointments})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}
// to mark appointment complete
const appointmentComplete = async (req, res) => {
    try {
        const docid = req.doc.id
        const {appointmentid} = req.body
        const appointmentData = await appointmentModel.findById(appointmentid)
        if (appointmentData && appointmentData.docid === docid) {
            await appointmentModel.findByIdAndUpdate(appointmentid, {isComplete : true})
            return res.json({success:true, message:'Appointment Completed'})
        } else {
            res.json({success:false, message:'Mark Failed'})
        }

    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}
// to mark appointment cancel
const appointmentCancel = async (req, res) => {
    try {
        const docid = req.doc.id
        const {appointmentid} = req.body
        const appointmentData = await appointmentModel.findById(appointmentid)
        if (appointmentData && appointmentData.docid === docid) {
            await appointmentModel.findByIdAndUpdate(appointmentid, {cancel : true})
            return res.json({success:true, message:'Appointment Cancelled'})
        } else {
            res.json({success:false, message:'Cancellation Failed'})
        }

    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

// Doctor Dashboard
const docDashboard = async (req, res) =>{
    try {
        const docid = req.doc.id
        const appointment = await appointmentModel.find({docid})
        let earning = 0
        appointment.map((item)=> {
            if (item.isComplete || item.payment) {
                earning += item.amount
            }
        })
        let patients = []
        appointment.map((item) => {
            if (!patients.includes(item.userid)) {
                patients.push(item.userid)
            }
        })
        const dashData = {
            earning,
            appointment: appointment.length,
            patients: patients.length,
            latestAppointments: appointment.reverse().slice(0,5)
        }
        res.json({success:true, dashData})
    }  
     catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

//Doc Profile
const docProfile = async (req, res) => {
    try {
        const docid = req.doc.id
        const profileData = await doctorModel.findById(docid).select('-password')
        res.json({success:true, profileData})

    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

// Update Doc Profile
const updateDocProfie = async (req, res) => {
    try {
        const docid = req.doc.id
        const {fees, address, available} = req.body
        await doctorModel.findByIdAndUpdate(docid, {fees, address, available})

        res.json({success:true, message:'Profile Updated'})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

export {changeAvailability, doctorlist, docLogin, docAppointments, appointmentCancel, appointmentComplete, docDashboard, docProfile, updateDocProfie}