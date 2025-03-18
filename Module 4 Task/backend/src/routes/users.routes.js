import { Router } from "express";
import { signUp, login, logout, getCurrentUser, getRefreshToken } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";

const router = Router();

router.route('/login').post(login);
router.route('/logout').post(verifyJWT, logout);
router.route('/sign-up').post(signUp);
router.route('/current-user').get(verifyJWT, getCurrentUser);
router.route('/refresh-token').get(verifyJWT, getRefreshToken);

export default router;