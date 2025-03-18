import jwt from "jsonwebtoken";
import "dotenv/config";
import { User } from "../models/user.model.js";

export async function verifyJWT(req, res, next) {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) res.status(401).json({ message: "Access Denied" });

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (!decodedToken) {
      res.status(401).json({ message: "Token has expired" });
    }

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) res.status(401).json({ message: "Access Denied" });

    req.user = user;

    next();
  } catch (error) {
    console.log("verifyJWT error: " + error);
  }
}
