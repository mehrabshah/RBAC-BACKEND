const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const Otp = require("../models/otpModel");
const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");

const registerUser = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User Already Exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    user = new User({ email, password: hashedPassword, role });
    await user.save();
    res.json({ msg: "User registered successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });
    const payload = { user: { id: user.id, role: user.role } };
    const token = jwt.sign(payload, "your_jwt_secret", { expiresIn: "1h" });
    res.json({ token, role: user.role });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const sendOTP = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "Email not found" });
    }
    const otp = otpGenerator.generate(6, {
      digits: true,
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    });
    const otpExpires = Date.now() +  600000;;
    await Otp.updateOne({ email }, { otp, otpExpires }, { upsert: true });

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is ${otp}.Please verify the code within 10 mins`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).send("Error sending OTP");
      }
      res.status(200).send("OTP sent successfully");
    });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const verifyOTP = async (req, res) => {

  const { otp, email } = req.body;
  try {
    const otpInfo = await Otp.findOne({ email });
    if (otpInfo && otpInfo.otp === otp && otpInfo.otpExpires > Date.now()) {


      const payload = { otp: { id: otpInfo.id } };
      const token = jwt.sign(payload, "your_jwt_secret", { expiresIn: "1h" });

      return res.status(200).json({ message: 'OTP verified successfully', token });

    }
    res.status(400).json({ error: "Invalid or expired OTP" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { registerUser, loginUser, sendOTP , verifyOTP };
