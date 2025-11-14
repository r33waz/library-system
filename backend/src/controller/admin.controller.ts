import { Request, Response } from "express";
import AdminService from "../service/admin.service";
import { sendResponse } from "../utils/responseHandler";

class AdminController {
  async getAllAdmin(req: Request, res: Response) {
    const result = await AdminService.getAllAdmin(req);
    sendResponse(res, {
      status: result?.status,
      data: result?.data,
      httpCode: result?.code,
    });
  }

  async getAllLibrary(req: Request, res: Response) {
    const result = await AdminService.getAllLibraries(req);
    sendResponse(res, {
      status: result?.status,
      data: result?.data,
      httpCode: result?.code,
    });
  }

  async createAdmin(req: Request, res: Response) {
    const result = await AdminService.create(req);
    sendResponse(res, {
      status: result?.status,
      message: result?.message,
      httpCode: result?.code,
    });
  }

  async updateStatus(req: Request, res: Response) {
    const result = await AdminService.updateStatus(req);
    sendResponse(res, {
      status: result?.status,
      message: result?.message,
      httpCode: result?.code,
    });
  }
}

export default new AdminController();
