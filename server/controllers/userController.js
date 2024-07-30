import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { sendOtpEmail, generateOtp, getOtpExpiration } from "../mailer.js"; // Import the OTP utility functions
const registerUser = async (req, res) => {
  const { fullname, email, password } = req.body;

  if (!fullname || !email || !password) {
    return res
      .status(422)
      .json({ error: "Please fill all the fields properly!!!" });
  }

  try {
    const userExist = await User.findOne({ email });

    if (userExist) {
      if (!userExist.verified) {
        const otp = generateOtp();
        const otpExpiration = getOtpExpiration();

        userExist.otp = otp;
        userExist.otpExpiration = otpExpiration;
        await userExist.save();
        await sendOtpEmail(email, otp);

        return res.status(200).json({
          message:
            "Email already exists but is not verified. OTP has been resent.",
        });
      }

      return res.status(422).json({ error: "Email already exists!!!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const otp = generateOtp();
    const otpExpiration = getOtpExpiration();

    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
      otp,
      otpExpiration,
      verified: false, // Initially set to false
    });

    await sendOtpEmail(email, otp); // Send OTP email
    await newUser.save();

    res
      .status(201)
      .json({ message: "User registered successfully! OTP sent to email." });
  } catch (error) {
    console.error("Error:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while processing your request..." });
  }
};

const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ error: "Please provide email and OTP" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.otp !== otp) {
      return res.status(401).json({ error: "Invalid OTP" });
    }

    if (new Date() > user.otpExpiration) {
      return res.status(401).json({ error: "OTP has expired" });
    }

    // OTP is valid and not expired
    // Remove OTP and expiration from user record
    user.otp = undefined;
    user.otpExpiration = undefined;
    user.verified = true; // Set user as verified
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.status(200).json({
      message: "OTP verified successfully",
      token,
      username: user.fullname,
    });
  } catch (error) {
    console.error("Error:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while verifying the OTP" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    if (!user.verified) {
      return res
        .status(403)
        .json({ error: "Account not verified. Please verify your email." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.status(200).json({
      message: "Login successful!",
      token,
      id: user._id,
    });
  } catch (error) {
    console.error("Error:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while processing your request..." });
  }
};

const changePassword = async (req, res) => {
  const { _id, oldPassword, newPassword } = req.body;

  if (!_id || !oldPassword || !newPassword) {
    return res
      .status(400)
      .json({ error: "Please provide all required fields" });
  }

  try {
    // Find the user by ID
    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the old password is correct
    const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isOldPasswordValid) {
      return res.status(401).json({ error: "Old password is incorrect" });
    }

    // Validate the new password (optional but recommended)
    if (newPassword.length < 6) {
      return res
        .status(400)
        .json({ error: "New password must be at least 6 characters long" });
    }

    // Hash the new password and update it in the database
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Error:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while changing the password" });
  }
};

const updateAvatar = async (req, res) => {
  const { Id, img } = req.body; // img is the base64 string

  // Validate input
  if (!Id || !img || !img.startsWith("data:image/")) {
    return res.status(400).json({ error: "Invalid input" });
  }

  try {
    // Find user by ID (assuming the model name is User)
    const user = await User.findById(Id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update the avatar image
    user.img = img;
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Avatar updated successfully" });
  } catch (error) {
    console.error("Error updating avatar:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Get Doctor By ID
const getById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving doctor details" });
  }
};

export {
  registerUser,
  verifyOtp,
  loginUser,
  changePassword,
  updateAvatar,
  getById,
};
