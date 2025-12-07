import { Request, Response } from "express";
import BookService from "../service/book.service";
import { sendResponse } from "../utils/responseHandler";

class BookController {
  async create(req: Request, res: Response) {
    const result = await BookService.create(req);
    sendResponse(res, {
      status: result?.status,
      message: result?.message,
      httpCode: result?.code,
    });
  }

  async getAll(req: Request, res: Response) {
    const result = await BookService.getAll(req);
    sendResponse(res, {
      status: result?.status,
      data: result?.data,
      message: result?.message,
      httpCode: result?.code,
      pagination: result?.pagination,
    });
  }

  async getOne(req: Request, res: Response) {
    const result = await BookService.getOne(req);
    sendResponse(res, {
      status: result?.status,
      data: result?.data,
      httpCode: result?.code,
    });
  }

  async update(req: Request, res: Response) {
    const result = await BookService.update(req);
    sendResponse(res, {
      status: result?.status,
      message: result?.message,
      httpCode: result?.code,
    });
  }

  async latestBook(req: Request, res: Response) {
    const result = await BookService.latestBook(req);
    sendResponse(res, {
      status: result?.status,
      data: result?.data,
      httpCode: result?.code,
    });
  }

  async getBooksByLibrary(req: Request, res: Response) {
    const result = await BookService.getBooksByLibrary(req);
    sendResponse(res, {
      status: result?.status,
      data: result?.data,
      message: result?.message,
      httpCode: result?.code,
      pagination: result?.pagination,
    });
  }
}

export default new BookController();
