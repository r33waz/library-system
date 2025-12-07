import { Request, Response } from "express";
import genreService from "../service/genre.service";
import { sendResponse } from "../utils/responseHandler";

class genreController  {
    async create(req: Request, res: Response)  {
        const result = await genreService.create(req);
        sendResponse(res, {
            status: result?.status,
            message: result?.message,
            httpCode: result?.code
        });
    }

    async getAll(req:Request,res:Response){
        const result = await genreService.getAll(req)
        sendResponse(res, {
            status: result?.status,
            data: result?.data,
            message: result?.message,
            httpCode: result?.code
        });
    }

    async update(req:Request,res:Response){
        const result = await genreService.update(req)
        console.log("🚀 ~ update:async ~ result:", result)
        sendResponse(res, {
            status: result?.status,
            message: result?.message,
            httpCode:result?.code
        });
    }

    async delete(req:Request,res:Response){
    const result = await genreService.delete(req)
    sendResponse(res, {
        status: result?.status,
        message: result?.message,
        httpCode: result?.code
        
    });
    }
};

export default new genreController();
