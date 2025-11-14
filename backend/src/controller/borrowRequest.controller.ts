import { Request, Response } from "express";
import BorrowRequestService from "../service/borrowRequest.service";
import { sendResponse } from "../utils/responseHandler";

class BorrowRequestController {
  create = async (req: Request, res: Response) => {
    const result = await BorrowRequestService.create(req);
    sendResponse(res, {
      status: result?.status,
      message: result?.message,
      httpCode: result?.code,
    });
  };

  getAllUser = async (req: Request, res: Response) => {
    const result = await BorrowRequestService.getAllByUser(req);
    sendResponse(res, {
      status: result?.status,
      data: result?.data,
      message: result?.message,
      httpCode: result?.code,
      pagination: result?.pagination,
    });
  };

  updateStatus = async (req: Request, res: Response) => {
    const result = await BorrowRequestService.updateStatus(req);
    sendResponse(res, {
      status: result?.status,
      message: result?.message,
      httpCode: result?.code,
    });
  };
}

export default new BorrowRequestController();
