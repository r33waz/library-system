import express from "express";
import { ROLES } from "../constant/enum";
import CategoryController from "../controller/category.controller";
import { authenticateUser, authorizeUser } from "../middleware/auth.middleware";

const router = express.Router();
router.get("/getAll", CategoryController.getAll);
router.use(authenticateUser);
router.use(authorizeUser([ROLES?.SUDO_ADMIN]));
router.post("/create", CategoryController.create);
router.patch("/update/:id", CategoryController.update);
router.delete("/delete/:id", CategoryController.delete);
export default router;
