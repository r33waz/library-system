import rateLimit from "express-rate-limit";

export const loginLimiter = rateLimit({
  max: 20,
  // 15 minutes
  windowMs: 15 * 60 * 1000, // 15 minutes
  message: "Too many requests from this IP, please try again after 15 minutes",
});

export const registerLimiter = rateLimit({
  max: 20,
  //   ten minutes
  windowMs: 10 * 60 * 1000,
  message: "Too many requests from this IP, please try again after 10 minutes",
});

export const resetPasswordLimiter = rateLimit({
  max: 5,
  //  30 minutes
  windowMs: 30 * 60 * 1000,
  message: "Too many requests from this IP, please try again after 30 minutes",
});

export const verifyEmailLimiter = rateLimit({
  max: 5,
  //  30 minutes
  windowMs: 30 * 60 * 1000,
  message: "Too many requests from this IP, please try again after 30 minutes",
});
