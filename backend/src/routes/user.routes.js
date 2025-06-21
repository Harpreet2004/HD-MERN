import express from "express"
import { googleLogin, sendOTPController, verifyOTPController } from "../controllers/user.controllers.js";

const router = express.Router();

router.post("/google-login", googleLogin);
router.post('/send-otp', sendOTPController);
router.post('/verify-otp', verifyOTPController);


export default router;