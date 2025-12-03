import express from "express";
import { ROLES } from "../constant/enum";
import CategoryController from "../controller/category.controller";
import {
    CreateCategoryDto,
    UpdateCategoryDto
} from "../dto/category.dto";
import { authenticateUser, authorizeUser } from "../middleware/auth.middleware";
import { validateDto } from "../middleware/RequestValidator";

const router = express.Router();
router.get("/getAll", CategoryController.getAll);
router.use(authenticateUser);
router.use(authorizeUser([ROLES?.SUDO_ADMIN]));
router.post(
  "/create",
  validateDto(CreateCategoryDto),
  CategoryController.create
);
router.patch(
  "/update/:id",
  validateDto(UpdateCategoryDto),
  CategoryController.update
);
router.delete("/delete/:id", CategoryController.delete);
export default router;
