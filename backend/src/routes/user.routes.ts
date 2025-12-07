import express from "express";
import { ROLES } from "../constant/enum";
import UserController from "../controller/user.controller";
import { UpdateUserDTO } from "../dto/user.dto";
import { authenticateUser, authorizeUser } from "../middleware/auth.middleware";
import { validateDto } from "../middleware/RequestValidator";

const router = express.Router();
router.use(authenticateUser);
router.patch(
  "/update-user/:id",
  validateDto(UpdateUserDTO),
  UserController.update
);
router.use(authorizeUser([ROLES?.SUDO_ADMIN]));
router.get("/list", UserController.getAllUsers);

export default router;
