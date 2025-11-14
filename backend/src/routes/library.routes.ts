import express from "express";
import { ROLES } from "../constant/enum";
import libraryController from "../controller/library.controller";
import LibraryEmpDto from "../dto/libraryEmp.dto";
import { authenticateUser, authorizeUser } from "../middleware/auth.middleware";
import { verifyCsrf } from "../middleware/crsf.middleware";
import { validateDto } from "../middleware/RequestValidator";

const router = express.Router();
router.get("/:id", libraryController.getOne);
router.use(authenticateUser);
router.use(authorizeUser([ROLES.SUDO_ADMIN, ROLES.LIBRARY_ADMIN]));

// router.get("/library/:id"); // Fix: add missing handler if needed
router.post(
  "/create-employee",
  validateDto(LibraryEmpDto),
  verifyCsrf,
  libraryController.create
);
// router.get("/getAll-employee", libraryController.getAll);

router.patch("/update-library/:id", libraryController.update);

export default router;
