import { Request, Response } from "express";
import GenreService from "../service/genre.service";
import { sendResponse } from "../utils/responseHandler";

const GenreController = {
    create: async (req: Request, res: Response) => {
        const result = await GenreService.create(req);
        sendResponse(res, {
            status: result?.status,
            message: result?.message,
            httpCode: result?.code
        });
    },

    getAll:async(req:Request,res:Response)=>{
        const result = await GenreService.getAll(req)
        sendResponse(res, {
            status: result?.status,
            data: result?.data,
            message: result?.message,
            httpCode: result?.code
        });
    },

    update:async(req:Request,res:Response)=>{
        const result = await GenreService.update(req)
        console.log("🚀 ~ update:async ~ result:", result)
        sendResponse(res, {
            status: result?.status,
            message: result?.message,
            httpCode:result?.code
        });
    },
    delete:async(req:Request,res:Response)=>{
    const result = await GenreService.delete(req)
    sendResponse(res, {
        status: result?.status,
        message: result?.message,
        httpCode: result?.code
        
    });
    }
};

export default GenreController;
