import express from "express";
import mediaController from "../controller/media.controller";
import { uploads } from "../middleware/multer";

const router = express.Router();

router.post("/uploads", uploads.array("files"), mediaController.uploadMedia);
router.post("/single-upload", uploads.single("file"), mediaController.singleUpload);

export default router;
