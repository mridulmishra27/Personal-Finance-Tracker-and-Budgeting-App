import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import db from "../config/mysql.js";

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

    // Check if user exists
    const [existingRows] = await db.query("SELECT id FROM users WHERE email = ?", [
      email,
    ]);
    if (existingRows && existingRows.length > 0) {
      return res.json({ success: false, message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const [insertResult] = await db.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );

    const userId = insertResult.insertId;
    const usertoken = jwt.sign({ id: userId }, process.env.JWT_SECRET);
    res.json({ success: true, usertoken });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({ success: false, message: "Email and password required" });
    }

    const [userRows] = await db.query(
      "SELECT id, password FROM users WHERE email = ?",
      [email]
    );
    
    if (!userRows || userRows.length === 0) {
      return res.json({ success: false, message: "User does not exist" });
    }

    const user = userRows[0];

    const matched = await bcrypt.compare(password, user.password);

    if (matched) {
      const usertoken = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
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
    const userid = req.user.id;

    const [userRows] = await db.query(
      "SELECT id, name, email, gender, dob, phone, image FROM users WHERE id = ?",
      [userid]
    );
    
    if (!userRows || userRows.length === 0) {
      return res.json({ success: false, message: "User not found" });
    }

    res.json({ success: true, userdata: userRows[0] });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userid = req.user.id;
    const { name, dob, gender } = req.body;
    const imageFile = req.file;

    if (!name || !dob || !gender) {
      return res.json({ success: false, message: "Data Missing" });
    }

    const [updateResult] = await db.query(
      "UPDATE users SET name = ?, dob = ?, gender = ? WHERE id = ?",
      [name, dob, gender, userid]
    );

    if (updateResult.affectedRows === 0) {
      return res.json({ success: false, message: "User not found or no changes made" });
    }

    // image upload
    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      const imageUrl = imageUpload.secure_url;
      await db.query("UPDATE users SET image = ? WHERE id = ?", [
        imageUrl,
        userid,
      ]);
    }

    res.json({ success: true, message: "Profile Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { registerUser, getProfile, loginUser, updateProfile };
