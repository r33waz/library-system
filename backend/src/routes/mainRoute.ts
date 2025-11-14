import express from "express";
import adminRoute from "./admin.routes";
import authRoute from "./auth.routes";
import billRoute from "./bill.routes";
import bookRoute from "./book.routes";
import borrowRequestRoute from "./borrowRequest.routes";
import categoryRouter from "./category.routes";
import genreRoute from "./genre.routes";
import libraryRoute from "./library.routes";
import libraryDahboardRoute from "./libraryDashboard.routes";
import mediaRoute from "./media.routes";
import userRoute from "./user.routes";
import wishListRoute from "./wishList.routes";

const router = express.Router();

router.use("/api/v1/auth", authRoute);
router.use("/api/v1/admin", adminRoute);
router.use("/api/v1/media", mediaRoute);
router.use("/api/v1/user", userRoute);
router.use("/api/v1/library", libraryRoute);
router.use("/api/v1/genre", genreRoute);
router.use("/api/v1/book", bookRoute);
router.use("/api/v1/category", categoryRouter);
router.use("/api/v1/wishlist", wishListRoute);
router.use("/api/v1/borrow", borrowRequestRoute);
router.use("/api/v1/bill", billRoute);
router.use("/api/v1/library-dashboard", libraryDahboardRoute);

export default router;
