import { Request } from "express";
import fs from "fs";
import multer from "multer";
import path from "path";
import cloudinary from "../utils/cloudinary";

const uploadPath = path.resolve(__dirname, "../image/uploads"); // Absolute path
// Set up multer for file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

// File validation (only allow image and video types)
const validateFile = (req: Request, file: any, cb: any) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "video/mp4"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"), false);
  }
};

// Set up multer with storage and validation
const uploads = multer({
  storage,
  fileFilter: validateFile,
});

// Cloudinary upload function
const uploadResult = async (file: Express.Multer.File) => {
  if (!file) {
    throw new Error("No file uploaded.");
  }

  try {
    // Upload to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(file.path, {
      folder: "library_management",
      resource_type: "auto",
      use_filename: true,
      unique_filename: false,
    });
    console.log("🚀 ~ uploadResult ~ uploadResult:", uploadResult);

    fs.unlink(file.path, (err) => {
      if (err) console.error("Error deleting file:", err);
    });
    // Remove the temporary file
    return {
      url: uploadResult.secure_url, // URL of the uploaded file
      type: uploadResult.format, // MIME type (e.g., jpg, mp4, etc.)
      name: uploadResult.original_filename, // Original file name
      mimeType: uploadResult.mimeTyspe,
      public_id: uploadResult.public_id,
    };
  } catch (error) {
    console.error("Cloudinary upload error:", error);

    fs.unlink(file.path, (err) => {
      if (err) console.error("Error deleting file:", err);
    });
    throw new Error("Error uploading to Cloudinary");
  }
};

export { uploadResult, uploads };
