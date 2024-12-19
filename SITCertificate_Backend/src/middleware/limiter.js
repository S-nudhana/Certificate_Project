import rateLimit from "express-rate-limit";

export const limiter = rateLimit({
  windowMs: 1000,
  max: 10,
  message: "Too many requests from this IP, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});
