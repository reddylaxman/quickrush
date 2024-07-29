import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
const transporter = nodemailer.createTransport({
  service: "gmail", // Use Gmail's SMTP service
  auth: {
    user: process.env.EMAIL, // Your Gmail address
    pass: process.env.PASSWORD, // Your Gmail app password
  },
});

console.log(process.env.EMAIL, process.env.PASSWORD);

export const sendOtpEmail = async (to, otp) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL, // Sender's email address
      to, // Recipient's email address
      subject: "Your OTP Code",
      text: `Your OTP code is ${otp}`,
    });
    console.log("OTP sent:", info.response);
  } catch (error) {
    console.error("Error sending OTP email:", error);
    throw new Error("Failed to send OTP");
  }
};
// Helper function to generate OTP
export const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Helper function to set OTP expiration time (e.g., 15 minutes from now)
export const getOtpExpiration = () => {
  const expirationTime = new Date();
  expirationTime.setMinutes(expirationTime.getMinutes() + 15); // Set expiration to 15 minutes from now
  return expirationTime;
};
