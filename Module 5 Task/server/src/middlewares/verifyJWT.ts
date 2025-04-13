import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import "dotenv/config";
import { User } from "../models/user.model.js";
import { IUser } from "../models/user.model.js";

interface DecodedToken extends JwtPayload {
  _id: string;
}

interface AuthenticatedRequest extends Request {
  user?: IUser;
}

export async function verifyJWT(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      res.status(401).json({ message: "Access Denied" });
      return;
    }

    const decodedToken = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string
    ) as DecodedToken;

    if (!decodedToken) {
      res.status(401).json({ message: "Token has expired" });
      return;
    }

    const user = await User.findById(decodedToken._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      res.status(401).json({ message: "Access Denied" });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("verifyJWT error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
