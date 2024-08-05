import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

export const sendOtpEmail = async (to, otp) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL,
      to,
      subject: "Verify your account",
      text: `Your OTP code is ${otp}`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #EAF0FC; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); text-align: center;">
            <h2 style="color: #0D6EFD; font-size: 28px; font-weight: bold; margin-bottom: 20px;">Verify your account</h2>
            <p style="color: #333333; font-size: 18px; margin-bottom: 16px;">Thank you for registering with our service. Please use the following OTP to complete your registration:</p>
            <p style="font-size: 36px; font-weight: bold; color: #0D6EFD; margin-bottom: 20px;">${otp}</p>
            <p style="color: #333333; font-size: 18px; margin-bottom: 16px;">This OTP is valid for 15 minutes.</p>
            <p style="color: #333333; font-size: 18px; margin-bottom: 16px;">If you did not request this OTP, please ignore this email.</p>
            <br />
            <p style="color: #333333; font-size: 18px; margin-bottom: 16px;">Best regards,</p>
            <p style="color: #333333; font-size: 18px;">Your Quickrush</p>
          </div>
        </div>
      `,
    });
    console.log("OTP sent:", info.response);
  } catch (error) {
    console.error("Error sending OTP email:", error);
    throw new Error("Failed to send OTP");
  }
};
export const resetOtpEmail = async (to, otp) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL,
      to,
      subject: "Password Reset OTP",
      text: `Your OTP code for password reset is ${otp}`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #EAF0FC; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); text-align: center;">
            <h2 style="color: #0D6EFD; font-size: 28px; font-weight: bold; margin-bottom: 20px;">Password Reset OTP</h2>
            <p style="color: #333333; font-size: 18px; margin-bottom: 16px;">You have requested to reset your password. Please use the following OTP to complete the process:</p>
            <p style="font-size: 36px; font-weight: bold; color: #0D6EFD; margin-bottom: 20px;">${otp}</p>
            <p style="color: #333333; font-size: 18px; margin-bottom: 16px;">This OTP is valid for 15 minutes.</p>
            <p style="color: #333333; font-size: 18px; margin-bottom: 16px;">If you did not request this OTP, please ignore this email.</p>
            <br />
            <p style="color: #333333; font-size: 18px; margin-bottom: 16px;">Best regards,</p>
            <p style="color: #333333; font-size: 18px;">Your Quickrush</p>
          </div>
        </div>
      `,
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
