import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

const options = {
  httpOnly: true,
  secure: true,
  sameSite: "None",
};

export const signUp = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      fullname,
      password: hashedPassword,
    });

    await user.save();

    return res.status(200).json({ message: "User registered successfully" });
  }
  catch (err) {
    return res.status(400).json(err);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const accessToken = jwt.sign(
      { _id: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );

    const refreshToken = jwt.sign(
      { _id: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({ message: "User Login successfully" });
  } 
  catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export const logout = async (req, res) => {
  try {
    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json({ message: "User logged Out" });
  } 
  catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export const getCurrentUser = async (req, res) => {
  return res.status(200).json({
    user: req.user,
    message: "User fetched successfully",
  });
};

export const getRefreshToken = async (req,res) => {
  try {
    
  } 
  catch (error) {
    
  }
}