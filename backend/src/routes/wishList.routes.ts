import express from "express";
import wishListController from "../controller/wishList.controller";
import { authenticateUser } from "../middleware/auth.middleware";
import { verifyCsrf } from "../middleware/crsf.middleware";

const router = express.Router();

router.use(authenticateUser);
router.post("/add",verifyCsrf, wishListController.toggle);
router.get("/:id", wishListController.getById);

export default router;
