import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User, IUser } from "../models/user.model.js";

const options = {
  httpOnly: true,
  secure: true,
  sameSite: "none",
} as const;

interface AuthenticatedRequest extends Request {
  user?: IUser;
}

export const signUp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { fullname, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(400).json({ error: "Email already in use!" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User<Partial<IUser>>({
      email,
      fullname,
      password: hashedPassword,
      refreshToken: null,
    });

    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne<IUser>({ email });

    if (!user) {
      res.status(401).json({ error: "Invalid email" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(401).json({ error: "Invalid password" });
      return;
    }

    const accessToken = jwt.sign(
      { _id: user._id },
      process.env.ACCESS_TOKEN_SECRET as string,
      { expiresIn: "1d" }
    );

    const refreshToken = jwt.sign(
      { _id: user._id },
      process.env.REFRESH_TOKEN_SECRET as string,
      { expiresIn: "7d" }
    );

    user.refreshToken = refreshToken;
    await user.save();

    res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({ message: "User logged in successfully" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const logout = async (req: any, res: Response): Promise<void> => {
  try {
    const user = await User.findOne<IUser>({ _id: req.user?._id });

    if (!user) {
      res.status(401).json({ error: "Invalid token" });
      return;
    }

    user.refreshToken = null;

    await user.save();

    res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json({ message: "User logged out successfully" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getCurrentUser = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  res.status(200).json({
    user: req.user,
    message: "User fetched successfully",
  });
};

export const getRefreshToken = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      res.status(401).json({ error: "Refresh token not provided" });
      return;
    }

    const user = await User.findOne<IUser>({ refreshToken });

    if (!user) {
      res.status(403).json({ error: "Invalid refresh token" });
      return;
    }

    const decodedToken = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET as string
    ) as { _id: string };

    if (!decodedToken) {
      res.status(403).json({ error: "Refresh token expired" });
      return;
    }

    const newAccessToken = jwt.sign(
      { _id: user._id },
      process.env.ACCESS_TOKEN_SECRET as string,
      { expiresIn: "1d" }
    );

    res
      .status(200)
      .cookie("accessToken", newAccessToken, options)
      .json({ message: "New access token generated" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
