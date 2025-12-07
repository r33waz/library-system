import { Request, Response } from "express";
import mediaService from "../service/media.service";

class mediaController{
  async uploadMedia(req: Request, res: Response)  {
    try {
      const result = await mediaService.uploadMedia(req.files, req.body.mediaType);
      res.status(result.statusCode).json({
        status: result.statusCode,
        data: result.data,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
      });
    }
  }

  async singleUpload(req: Request, res: Response){
    try {
      const result = await mediaService.uploadMedia(req.file, req.body.mediaType);
      res.status(result.statusCode).json({
        status: result.statusCode,
        data: result.data,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
      });
    }
  }
};

export default new mediaController();
