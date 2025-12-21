import crypto from "crypto";
import "dotenv/config";
import { NextFunction, Request, Response } from "express";
import messages from "../utils/message";


// Creates a token by hashing the complex secret with a salt and additional layers
export function createToken(secret: string): string {
  console.log("🚀 ~ createToken ~ secret:", secret)
  return crypto
    .createHmac("sha256", process.env.CSRF_TOKEN as string)
    .update(secret)
    .digest("hex");
}


export function verifyCsrf(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const secret = req.cookies.csrfSecret;
  const token = req.headers["x-csrf-token"];

  if (!secret || typeof token !== "string") {
    res.status(403).json({ error: "CSRF token missing or malformed" });
    return;
  }

  const expectedToken = createToken(secret);
  if (token !== expectedToken) {
    res.status(403).json({ error: messages?.errorMessages?.actionNotAllowed });
    return;
  }

  next();
}

const protectedMethods = ["POST", "PUT", "PATCH", "DELETE"];

export function csrfProtection(
  req: Request,
  res: Response,
  next: NextFunction
) {
  //  Skip CSRF protection for login and registration
  if (
    req.path === "/api/v1/auth/login" ||
    req.path === "/api/v1/auth/signup" ||
    req.path === "/api/v1/auth/verifyOtp" ||
    req.path === "/api/v1/auth/logout" ||
    req.path === "/api/v1/auth/google-login"
  ) {
    return next();
  }
  // Skip CSRF protection for protected methods
  if (protectedMethods.includes(req.method)) {
    return verifyCsrf(req, res, next);
  }
  next();
}