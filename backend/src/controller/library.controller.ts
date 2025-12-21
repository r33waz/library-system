import { Request, Response } from "express";
import { AuthenticatedRequest } from "../interface/auth.Interface";
import libraryService from "../service/library.service";
import { sendResponse } from "../utils/responseHandler";

class LibraryController {
  async create(req: Request, res: Response) {
    const result = await libraryService.create(req);
    sendResponse(res, {
      httpCode: result?.code,
      status: result?.status,
      message: result?.message,
    });
  }

  async getAllEmployee(req: Request, res: Response) {
    const result = await libraryService.getAllEmployees(
      req as AuthenticatedRequest
    );
    sendResponse(res, {
      status: result?.status,
      data: result?.data,
      httpCode: result?.code,
    });
  }

  async getOne(req: Request, res: Response) {
    const result = await libraryService.getOne(req);
    sendResponse(res, {
      httpCode: result?.code,
      status: result?.status,
      data: result?.data,
    });
  }

  async getOneEmp(req: Request, res: Response) {
    const result = await libraryService.getOneEmp(req);
    sendResponse(res, {
      httpCode: result?.code,
      status: result?.status,
      data: result?.data,
    });
  }

  async update(req: Request, res: Response) {
    const result = await libraryService.update(req);
    sendResponse(res, {
      httpCode: result?.code,
      status: result?.status,
      message: result?.message,
    });
  }
}

export default new LibraryController();
