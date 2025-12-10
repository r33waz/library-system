import { Request, Response } from "express";
import userService from "../service/user.service";

class userController{

  // get single user details 
  async getSingleUser(req:Request,res:Response){
    
  }

  // get all the user details
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


  // update the user details 
  async update(req: Request, res: Response) {
    const result = await userService?.updateUser(req);
    res?.status(result?.status).json({
      status: result?.status,
      message: result?.message,
    });
  }
};

export default new userController();
