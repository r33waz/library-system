import { Request, Response } from "express";
import categoryService from "../service/category.service";
import { sendResponse } from "../utils/responseHandler";

class categoryController {
  async create(req: Request, res: Response) {
    const result = await categoryService.create(req);
    sendResponse(res, {
      status: result?.status,
      message: result?.message,
      httpCode: result?.code,
    });
  }
  async getAll(req: Request, res: Response){
    const result = await categoryService.getAll(req);
    sendResponse(res, {
      status: result?.status,
      data: result?.data,
      message: result?.message,
      // httpCode: result?.code,
    });
  }
  async getOne(req: Request, res: Response) {
    const result = await categoryService.getOne(req);
    sendResponse(res, {
      status: result?.status,
      data: result?.data,
      httpCode: result?.code,
    });
  }
  async update(req: Request, res: Response){
    const result = await categoryService.update(req);
    sendResponse(res, {
      status: result?.status,
      message: result?.message,
      httpCode: result?.code,
    });
  }
  async delete(req: Request, res: Response) {
    const result = await categoryService.delete(req);
    sendResponse(res, {
      status: result?.status,
      message: result?.message,
      httpCode: result?.code,
    });
  }
};

export default new categoryController();
