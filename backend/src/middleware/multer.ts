import { Request } from "express";
import fs from "fs";
import multer from "multer";
import path from "path";
import cloudinary from "../utils/cloudinary";

// -------------------------------------------------------------------
// Upload directory
// -------------------------------------------------------------------
const uploadPath = path.resolve(__dirname, "../image/uploads");
if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath, { recursive: true });

// -------------------------------------------------------------------
// Multer storage
// -------------------------------------------------------------------
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadPath);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

// -------------------------------------------------------------------
// File validation
// -------------------------------------------------------------------
const validateFile = (
  _req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "video/mp4",
    "application/pdf",
  ];

  if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(new Error(`Invalid file type: ${file.mimetype}`));
  }

  cb(null, true);
};

// -------------------------------------------------------------------
// Multer instance
// -------------------------------------------------------------------
const uploads = multer({
  storage,
  fileFilter: validateFile,
  limits: {
    fileSize: 20 * 1024 * 1024, // 20 MB max
  },
});

// -------------------------------------------------------------------
// Cloudinary upload function
// -------------------------------------------------------------------
const uploadResult = async (file: Express.Multer.File) => {
  if (!file) throw new Error("No file uploaded.");

  const isPdf = file.mimetype === "application/pdf";
  const isVideo = file.mimetype === "video/mp4";
  const isImage =
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png";

  // Determine folder, resource type, and type string
  let folder = "library_management/media";
  let resourceType: "image" | "video" | "raw" = "image";
  let type: string;

  if (isPdf) {
    folder = "library_management/pdfs";
    resourceType = "raw";
    type = "pdf";
  } else if (isVideo) {
    folder = "library_management/videos";
    resourceType = "video";
    type = "mp4";
  } else if (isImage) {
    folder = "library_management/images";
    resourceType = "image";
    type = file.mimetype.split("/")[1]; // jpg, png
  } else {
    throw new Error("Unsupported file type");
  }

  const result = await cloudinary.uploader.upload(file.path, {
    folder,
    resource_type: resourceType,
    use_filename: true,
    unique_filename: false,
  });

  // Remove temporary local file
  fs.unlinkSync(file.path);

  return {
    url: result.secure_url,
    name: result.original_filename,
    type, // always defined
    resourceType,
    public_id: result.public_id,
  };
};

export { uploadResult, uploads };

