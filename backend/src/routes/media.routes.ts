import express from "express";
import MediaController from "../controller/media.controller";
import { uploads } from "../middleware/multer";

const router = express.Router();

router.post("/uploads", uploads.array("files"), MediaController.uploadMedia);
router.post("/single-upload", uploads.single("file"), MediaController.singleUpload);

export default router;
