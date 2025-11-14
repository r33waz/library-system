import { Request, Response } from "express";
import CategoryService from "../service/category.service";
import { sendResponse } from "../utils/responseHandler";

const CategoryController = {
  create: async (req: Request, res: Response) => {
    const result = await CategoryService.create(req);
    sendResponse(res, {
      status: result?.status,
      message: result?.message,
      httpCode: result?.code,
    });
  },
  getAll: async (req: Request, res: Response) => {
    const result = await CategoryService.getAll(req);
    sendResponse(res, {
      status: result?.status,
      data: result?.data,
      message: result?.message,
      // httpCode: result?.code,
    });
  },
  getOne: async (req: Request, res: Response) => {
    const result = await CategoryService.getOne(req);
    sendResponse(res, {
      status: result?.status,
      data: result?.data,
      httpCode: result?.code,
    });
  },
  update: async (req: Request, res: Response) => {
    const result = await CategoryService.update(req);
    sendResponse(res, {
      status: result?.status,
      message: result?.message,
      httpCode: result?.code,
    });
  },
  delete: async (req: Request, res: Response) => {
    const result = await CategoryService.delete(req);
    sendResponse(res, {
      status: result?.status,
      message: result?.message,
      httpCode: result?.code,
    });
  },
};

export default CategoryController;
