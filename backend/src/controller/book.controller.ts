import { Request, Response } from "express";
import BookService from "../service/book.service";
import { sendResponse } from "../utils/responseHandler";

const BookController = {
  create: async (req: Request, res: Response) => {
    const result = await BookService.create(req);
    sendResponse(res, {
      status: result?.status,
      message: result?.message,
      httpCode: result?.code,
    });
  },
  getAll: async (req: Request, res: Response) => {
    const result = await BookService.getAll(req);
    sendResponse(res, {
      status: result?.status,
      data: result?.data,
      message: result?.message,
      httpCode: result?.code,
      pagination: result?.pagination,
    });
  },

  getOne: async (req: Request, res: Response) => {
    const result = await BookService.getOne(req);
    sendResponse(res, {
      status: result?.status,
      data: result?.data,
      httpCode: result?.code,
    });
  },

  update: async (req: Request, res: Response) => {
    const result = await BookService.update(req);
    sendResponse(res, {
      status: result?.status,
      message: result?.message,
      httpCode: result?.code,
    });
  },

  latestBook: async (req: Request, res: Response) => {
    const result = await BookService.latestBook(req);
    sendResponse(res, {
      status: result?.status,
      data: result?.data,
      httpCode: result?.code,
    });
  },

  getBooksByLibrary: async (req: Request, res: Response) => {
    const result = await BookService.getBooksByLibrary(req);
    sendResponse(res, {
      status: result?.status,
      data: result?.data,
      message: result?.message,
      httpCode: result?.code,
      pagination: result?.pagination,
    });
  },
};

export default BookController;
