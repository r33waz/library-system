import { Request, Response } from "express";
import userService from "../service/user.service";

class userController{
  async getAllUsers(req: Request, res: Response) {
    const result = await userService.getAllUser(req);
    res?.status(result?.status).json({
      status: result?.status,
      message: result?.message,
      data: result?.data,
      // page: result?.page,
      // limit: result?.limit,
      total: result?.totalCount,
    });
  }

  async update(req: Request, res: Response) {
    const result = await userService?.updateUser(req);
    res?.status(result?.status).json({
      status: result?.status,
      message: result?.message,
    });
  }
};

export default new userController();
