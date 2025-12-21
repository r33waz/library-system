import { Request, Response } from "express";
import { AuthenticatedRequest } from "../interface/auth.Interface";
import authService from "../service/auth.service";
import { sendResponse } from "../utils/responseHandler";

class AuthController {
  // // Login handler
  async login(req: Request, res: Response): Promise<void> {
    const result = await authService.login(req.body, res);
    sendResponse(res, {
      status: result?.status,
      message: result?.message,
      httpCode: result?.code,
      data: result?.data,
    });
  }

  async googleLogin(req: Request, res: Response): Promise<void> {
    console.log("🚀 ~ req:", req);
    const result = await authService.googleLoginService(req, res);
    sendResponse(res, {
      status: result?.status,
      message: result?.message,
      httpCode: result?.code,
      data: result?.data,
    });
  }

  async verifyOtp(req: Request, res: Response): Promise<void> {
    const result = await authService.verifyOtp(req);
    sendResponse(res, {
      status: result?.status,
      httpCode: result?.code,
      message: result?.message,
    });
  }

  // Signup handler
  async signup(req: Request, res: Response): Promise<void> {
    const result = await authService.signUpService(req);
    sendResponse(res, {
      status: result?.status,
      httpCode: result?.code,
      message: result?.message,
    });
  }

  // Forgot Password handler
  // forgotPassword: async (req: Request, res: Response): Promise<void> => {
  //   const { email } = req.body;
  //   res.send(`Forgot Password logic here for email: ${email}`);
  // },

  // Reset Password handler
  // resetPassword: async (req: Request, res: Response): Promise<void> => {
  //   const { email, password } = req.body;
  //   res.send(`Reset Password logic here for email: ${email}`);
  // },

  // Change Password handler
  // changePassword: async (req: Request, res: Response): Promise<void> => {
  //   const { email, password } = req.body;
  //   res.send(`Change Password logic here for email: ${email}`);
  // },

  // Logout handler
  async logout(req: Request, res: Response): Promise<void> {
    const result = await authService.logoutService(res);
    res.status(result?.status || 200).json({
      status: result?.status,
      message: result?.message,
    });
  }

  // Refresh Token handler
  // refreshToken: async (req: Request, res: Response): Promise<void> => {
  //   const { email } = req.body;
  //   res.send(`Refresh Token logic here for email: ${email}`);
  // },

  // authorized user
  async authorizedUser(req: Request, res: Response): Promise<void> {
    const result = await authService.authorizeUser(
      req as AuthenticatedRequest,
      res
    );
    sendResponse(res, {
      status: result?.status,
      data: result?.data,
      httpCode: result?.code,
    });
  }
  // Get User Info handler
  async me(req: Request, res: Response): Promise<void> {
    const result = await authService.me(req as AuthenticatedRequest);
    res.status(result?.status || 200).json({
      status: result?.status,
      data: result?.data,
    });
  }

  async csrfToken(req: Request, res: Response) {
    const result = await authService.csrfTokenService(req);
    sendResponse(res, {
      status: result?.status,
      data: result?.data,
      httpCode: result?.code,
    });
  }
}

export default new AuthController();
