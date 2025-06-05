import multer, { StorageEngine, FileFilterCallback } from "multer";
import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../controller/auth/jwt";

const storage: StorageEngine = multer.diskStorage({
  destination: function (req: Request, file: Express.Multer.File, cb: Function) {
    const category = req.query.category as string; 
    cb(null, `./uploads/${category}`);
  },
  filename: function (req: Request, file: Express.Multer.File, cb: Function) {
    const token = req.cookies.token;
    const decoded = verifyToken(token);

    if (typeof decoded === "object" && decoded !== null && "role" in decoded && decoded.role === "student") {
      cb(null, `${Date.now()}_${(decoded as any).id}.pdf`);
    } else {
      cb(null, `${Date.now()}_${file.originalname}`);
    }
  },
});

export const upload = multer({ storage });
