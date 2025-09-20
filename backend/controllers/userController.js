import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";

const registerUser = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing Details" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Enter valid Email" });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password must be of 8 characters",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const userdata = {
      name,
      email,
      password: hashedPassword,
    };

    const newuser = new userModel(userdata);
    const user = await newuser.save();

    const usertoken = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ success: true, usertoken });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }

    const matched = await bcrypt.compare(password, user.password);

    if (matched) {
      const usertoken = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ success: true, usertoken });
    } else {
      res.json({ success: false, message: "Credentials Mismatch" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const userid = req.user.id; // <-- get from req.user
    const userdata = await userModel.findById(userid).select("-password");
    res.json({ success: true, userdata });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userid = req.user.id;
    const { name, phone, address, dob, gender } = req.body;
    const imageFile = req.file;

    if (!name || !phone || !dob || !gender) {
      return res.json({ success: false, message: "Data Missing" });
    }

    let parsedAddress = address;
    if (typeof address === "string") {
      try {
        parsedAddress = JSON.parse(address);
      } catch {
        return res.json({ success: false, message: "Invalid address format" });
      }
    }

    await userModel.findByIdAndUpdate(userid, {
      name,
      phone,
      address: parsedAddress,
      dob,
      gender,
    });
    //image upload
    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' });
      const imageUrl = imageUpload.secure_url;
      await userModel.findByIdAndUpdate(userid, { image: imageUrl });
    }

    res.json({ success: true, message: 'Profile Updated' });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Appointment Booking
const bookApointment = async (req, res) => {
  try {
    const userid = req.user.id
    const {docid, slotDate, slotTime} = req.body
    const docData = await doctorModel.findById(docid).select('-password')

    if (!docData.available) {
      return res.json({success:false, message: 'Doctor Not Available'})
    }
// Check for slot availability
    let slots_booked = docData.slots_booked
    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({success:false, message: 'Slot unavailable'})
      } else {
        slots_booked[slotDate].push(slotTime)
      }
    }else {
      slots_booked[slotDate] = []
      slots_booked[slotDate].push(slotTime)
    }

    const userdata = await userModel.findById(userid).select('-password')

    const docDataObj = docData.toObject();
    delete docDataObj.slots_booked

    const appointmentData = {
      userid,
      docid,
      userdata,
      docData:docDataObj,
      amount:docData.fees,
      slotTime,
      slotDate,
      date: Date.now()

    }

    const newAppointment  = new appointmentModel(appointmentData)
    await newAppointment.save()

    // new slotsData in docdata
    await doctorModel.findByIdAndUpdate(docid, {slots_booked})

    res.json({success:true, message: ' Appointment Booked'})

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

// to get appointments

const appointmentList = async (req, res) => {
  try {
    const userid = req.user.id
    const appointments  = await appointmentModel.find({userid})

    res.json({success:true, appointments})

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

// to cancel appointments
const cancelAppointment = async (req, res) => {
  try {
    const userid = req.user.id
    const {appointmentid} = req.body
    const appointmentData = await appointmentModel.findById(appointmentid)

    if (appointmentData.userid !== userid) {
      return res.json({success:false, message:'Unauthorized Access'})
    }

    await appointmentModel.findByIdAndUpdate(appointmentid, {cancel: true})
    const {docid, slotDate, slotTime} = appointmentData

    const docData = await doctorModel.findById(docid)

    let slots_booked = docData.slots_booked
    slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)

    await doctorModel.findByIdAndUpdate(docid, {slots_booked})
    res.json({success: true, message:'Appointment Cancelled'})

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

export { registerUser, getProfile, loginUser, updateProfile, bookApointment, appointmentList, cancelAppointment};
