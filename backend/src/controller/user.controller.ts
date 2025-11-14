import { Request, Response } from "express";
import UserService from "../service/user.service";

const UserController = {
  getAllUsers: async (req: Request, res: Response) => {
    const result = await UserService.getAllUser(req);
    res?.status(result?.status).json({
      status: result?.status,
      message: result?.message,
      data: result?.data,
      // page: result?.page,
      // limit: result?.limit,
      total: result?.totalCount,
    });
  },

  update: async (req: Request, res: Response) => {
    const result = await UserService?.updateUser(req);
    res?.status(result?.status).json({
      status: result?.status,
      message: result?.message,
    });
  },
};

export default UserController;
