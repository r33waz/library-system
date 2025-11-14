import express from "express";
import { ROLES } from "../constant/enum";
import libraryDashboardController from "../controller/libraryDashboard.controller";
import { authenticateUser, authorizeUser } from "../middleware/auth.middleware";

const router = express.Router();
router.use(authenticateUser);
router.use(
  authorizeUser([ROLES?.SUDO_ADMIN, ROLES?.LIBRARY_ADMIN, ROLES?.LIBRARY_EMP])
);
router.get("/stats", libraryDashboardController.LibraryStats);
router.get("/borrower-stats", libraryDashboardController.LibraryBorrowerStast);
router.get(
  "/genre-distribution",
  libraryDashboardController.LibraryGenreDistribution
);
router.get(
  "/category-distribution",
  libraryDashboardController.LibraryCatergoryDistribution
);

export default router;
