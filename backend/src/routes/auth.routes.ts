import express from "express";
import authController from "../controller/auth.controller";
import { LoginDto, SignupDto } from "../dto/auth.dto";
import { validateDto } from "../middleware/RequestValidator";
import { authenticateUser } from "../middleware/auth.middleware";
import { uploads } from "../middleware/multer";
const router = express.Router();

router.post(
  "/signup",
  validateDto(SignupDto),
  uploads.array("file"),
  authController.signup,
);

console.log("routes running");
router.post("/verifyOtp", authController.verifyOtp);
router.post("/login", validateDto(LoginDto), authController.login);
router.post("/google-login", authController.googleLogin);
router.post("/refresh-token", authController.refreshToken);
router.post("/reset-password", authController.restPassword);
router.post("/forget-password", authController.forgotPassword);
router.use(authenticateUser);
router.get("/authorize", authController.authorizedUser);
router.get("/csrf-token", authController.csrfToken);
router.get("/me", authController.me);

router.post("/logout", authController.logout);

export default router;
