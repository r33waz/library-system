import { NextFunction, Request, Response } from "express";
import { ROLES, STATUS_CODE } from "../constant/enum";
import { verifyToken } from "../helper/genToken";
import messages from "../utils/message";

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.cookies?.accessToken;

    if (!token) {
      res.status(STATUS_CODE.UNAUTHORIZED).json({
        status: STATUS_CODE.UNAUTHORIZED,
        messages: messages?.errorMessages?.invalidTokens,
      });
      return;
    }

    try {
      const decoded = await verifyToken(token, process.env.ACCESS_TOKEN);
      (req as any).user = decoded;
      // console.log("🚀 ~ decoded:", decoded);
      next();
    } catch (error) {
      res.status(STATUS_CODE.SESSION_EXPIRED).json({ 
        status: STATUS_CODE.SESSION_EXPIRED,
        messages: messages?.errorMessages?.invalidTokens,
      });
    }
  } catch (error) {
    // console.error("Authentication Error:", error);
    res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ 
      status: STATUS_CODE.INTERNAL_SERVER_ERROR 
    });
  }
};

export const authorizeUser = (roles: ROLES[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const user = (req as any).user;
    console.log("🚀 ~ authorizeUser ~ user:", user)

    if (!user) {
      res.status(STATUS_CODE.UNAUTHORIZED).json({ message: "Unauthorized - No user found" });
      return;
    }

    if (roles.includes(user.role)) {
      return next();
    }

    res.status(STATUS_CODE?.FORBIDDEN).json({ message: messages?.errorMessages?.forbidden });
  };
};