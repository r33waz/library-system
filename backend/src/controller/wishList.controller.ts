import { Request, Response } from "express";
import WishListService from "../service/wishList.service";
import { sendResponse } from "../utils/responseHandler";

class wishListController  {
   async toggle(req: Request, res: Response) {
    const result = await WishListService.toggle(req);
    sendResponse(res, {
      status: result?.status,
      message: result?.message,
      httpCode: result?.code,
    });
  }
  async getById(req: Request, res: Response){
    const result = await WishListService.getById(req);
    sendResponse(res, {
      status: result?.status,
      data: result?.data,
      httpCode: result?.code,
    });
  }
};

export default new wishListController();
