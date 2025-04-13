import { Router } from "express";
import {
  signUp,
  login,
  logout,
  getCurrentUser,
  getRefreshToken,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";
import { loginSchema, registerSchema, validate } from "../middlewares/zodSchema.js";

const router: Router = Router();

router.route("/login").post(validate(loginSchema), login);
router.route("/logout").post(verifyJWT, logout);
router.route("/sign-up").post(validate(registerSchema), signUp);
router.route("/current-user").get(verifyJWT, getCurrentUser);
router.route("/refresh-token").get(verifyJWT, getRefreshToken);

export default router;
