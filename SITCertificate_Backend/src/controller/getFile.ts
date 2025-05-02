import { Request, Response } from "express";
import { verifyToken } from "./auth/jwt";

const getFile: (req: Request, res: Response) => void = (req, res) => {
  const filepath = req.query.filepath as string;
  const token = req.cookies.token;
  const referer = req.headers.referer || req.headers.origin;
  const allowedOrigins = process.env.CORS_ORIGIN;
  try {
    if (!token) {
      return res.status(401).json({
        message: "This file cannot be accessed without a valid token.",
      });
    }
    const userId = verifyToken(token);
    if (typeof userId !== "string" && (userId.role !== "admin" || userId.role !== "professor") && (!referer || !allowedOrigins || !referer.includes(allowedOrigins))) {
      return res.status(403).json({
        message: "Direct access to this file is not allowed.",
      });
    }

    res.sendFile(`${filepath}`, { root: "./" });
  } catch (error) {
    console.error("Error processing file request:", error);
    return res.status(500).json({
      message: "An error occurred while processing the file request.",
    });
  }
}
export default getFile;