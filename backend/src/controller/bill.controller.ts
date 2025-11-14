import { Request, Response } from "express";
import billService from "../service/bill.service";
import { sendResponse } from "../utils/responseHandler";

class BillController {
  async getAllBills() {}

  async getBillById(req: Request, res: Response) {
    const result = await billService.getOneById(req);
    sendResponse(res, {
      status: result?.status,
      data: result?.data,
      httpCode: result?.code,
    });
  }
}
export default new BillController();
