import express from "express";
import { ROLES } from "../constant/enum";
import categoryController from "../controller/category.controller";
import { CreateCategoryDto, UpdateCategoryDto } from "../dto/category.dto";
import { authenticateUser, authorizeUser } from "../middleware/auth.middleware";
import { validateDto } from "../middleware/RequestValidator";

const router = express.Router();
router.get("/getAll", categoryController.getAll);
router.use(authenticateUser);
router.use(authorizeUser([ROLES?.SUDO_ADMIN]));
router.post(
  "/create",
  validateDto(CreateCategoryDto),
  categoryController.create
);
router.patch(
  "/update/:id",
  validateDto(UpdateCategoryDto),
  categoryController.update
);
router.delete("/delete/:id", categoryController.delete);
export default router;
