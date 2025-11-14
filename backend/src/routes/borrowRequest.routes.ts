import express from "express";
import { ROLES } from "../constant/enum";
import borrowRequestController from "../controller/borrowRequest.controller";
import BorrowRequestDto from "../dto/borrowRequest.dto";
import { authenticateUser, authorizeUser } from "../middleware/auth.middleware";
import { validateDto } from "../middleware/RequestValidator";

const router = express.Router();

router.use(authenticateUser);
router.post(
  "/request",
  validateDto(BorrowRequestDto),
  borrowRequestController.create
);
router.get("/user-books", borrowRequestController.getAllUser);
router.use(authorizeUser([ROLES?.SUDO_ADMIN, ROLES?.LIBRARY_ADMIN]));
router.patch("/:id/status", borrowRequestController.updateStatus);

export default router;
