import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import User from '../models/user.models.js'; 
import dotenv from 'dotenv';
import { sendOTP } from '../../utils/mailer.js';
import UserModel from '../models/user.models.js';


dotenv.config();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleLogin = async (req, res) => {
  const { idToken } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name } = payload;

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ email, name, provider: 'google' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.json({ token, user });


  } catch (err) {
    console.error('Google login error:', err);
    res.status(401).json({ error: 'Invalid Google token' });
  }
};



const otpStore = {}; 

export const sendOTPController = async (req, res) => {
  const { email } = req.body;

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore[email] = otp;

  try {
    await sendOTP(email,otp);
    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ message: 'Failed to send OTP' });
  }
};

export const verifyOTPController = async (req, res) => {
  const { email, otp, name } = req.body;

  try {
    if (otpStore[email] === otp) {
      let user = await UserModel.findOne({ email });
      // If user doesn't exist, create one
      if (!user) {
        user = await UserModel.create({ email,name });
        console.log({user})
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

      delete otpStore[email];
      console.log({user})
      return res.status(200).json({
        message: 'OTP verified',
        token,
        user,
      });
    }

    res.status(400).json({ message: 'Invalid OTP' });
  } catch (error) {
    console.error("OTP verification error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
