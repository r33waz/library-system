import express from "express";
import WishListController from "../controller/wishList.controller";
import { authenticateUser } from "../middleware/auth.middleware";
import { verifyCsrf } from "../middleware/crsf.middleware";

const router = express.Router();

router.use(authenticateUser);
router.post("/add",verifyCsrf, WishListController.toggle);
router.get("/:id", WishListController.getById);

export default router;
