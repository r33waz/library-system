import { Request, Response } from "express";
import libraryDashboardService from "../service/libraryDashboard.service";
import { sendResponse } from "../utils/responseHandler";

class LibraryDashboardController {
  async LibraryStats(req: Request, res: Response) {
    const result = await libraryDashboardService.LibraryStast(req);
    sendResponse(res, {
      status: result?.status,
      data: result?.data,
      httpCode: result?.code,
    });
  }

  async LibraryBorrowerStast(req: Request, res: Response) {
    const result = await libraryDashboardService?.LibraryBorrowerStast(req);
    sendResponse(res, {
      status: result?.status,
      data: result?.data,
      httpCode: result?.code,
    });
  }

  async LibraryGenreDistribution(req: Request, res: Response) {
    const result = await libraryDashboardService?.LibraryGenreDistribution(req);
    sendResponse(res, {
      status: result?.status,
      data: result?.data,
      httpCode: result?.code,
    });
  }

    async LibraryCatergoryDistribution(req: Request, res: Response) {
    const result = await libraryDashboardService?.LibraryCatergoryDistribution(req);
    sendResponse(res, {
      status: result?.status,
      data: result?.data,
      httpCode: result?.code,
    });
  }
}

export default new LibraryDashboardController();
