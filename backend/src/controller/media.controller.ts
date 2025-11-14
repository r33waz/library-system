import { Request, Response } from "express";
import MediaService from "../service/media.service";

const MediaController = {
  uploadMedia: async (req: Request, res: Response) => {
    try {
      const result = await MediaService.uploadMedia(req.files, req.body.mediaType);
      res.status(result.statusCode).json({
        status: result.statusCode,
        data: result.data,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
      });
    }
  },

  singleUpload: async (req: Request, res: Response) => {
    try {
      const result = await MediaService.uploadMedia(req.file, req.body.mediaType);
      res.status(result.statusCode).json({
        status: result.statusCode,
        data: result.data,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
      });
    }
  },
};

export default MediaController;
