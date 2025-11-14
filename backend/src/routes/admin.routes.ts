import express from "express";
import { ROLES } from "../constant/enum";
import AdminController from "../controller/admin.controller";
import { authenticateUser, authorizeUser } from "../middleware/auth.middleware";

const router = express.Router();

// Authenticate all routes
router.use(authenticateUser);

  
// Only SUDO_ADMIN can access these routes
router.use(authorizeUser([ROLES.SUDO_ADMIN]));
router.get("/list", AdminController.getAllAdmin);
router.get("/libraries-list", AdminController.getAllLibrary);
// router.get("/library/:id"); 
router.post("/create-library", AdminController.createAdmin);
router.patch("/update-library-status/:id", AdminController.updateStatus);

// Now allow both SUDO_ADMIN and LIBRARY_ADMIN to update the library

export default router;
