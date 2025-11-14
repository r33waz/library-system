import exporess from "express";
import authController from "../controller/auth.controller";
import { LoginDto, SignupDto } from "../dto/auth.dto";
import { validateDto } from "../middleware/RequestValidator";
import { authenticateUser } from "../middleware/auth.middleware";
import { uploads } from "../middleware/multer";

const router = exporess.Router();
router.post(
  "/signup",
  validateDto(SignupDto),
  uploads.array("file"),
  authController.signup
);
router.post("/login", validateDto(LoginDto), authController.login);
router.post("/google-login", authController.googleLogin);
router.use(authenticateUser);
router.get("/authorize", authController.authorizedUser);
router.get("/csrf-token", authController.csrfToken);
router.get("/me", authController.me);
router.post("/logout", authController.logout);

export default router;
