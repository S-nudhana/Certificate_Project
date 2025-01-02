import express from "express";

import getEventById from "../controller/user/getEventById.js";
import getAllInProgressEvent from "../controller/user/getAllInProgressEvent.js";
import getAllHistoryEvent from "../controller/user/getAllHistoryEvent.js";
import getCommentById from "../controller/user/getCommentById.js";
import verifyCookiesToken from "../controller/token/verifyCookiesToken.js";
import deleteToken from "../controller/token/deleteToken.js";
import uploadFile from "../controller/user/uploadFile.js";

import authMiddleware from "../middleware/authMiddleware.js";
import { accessManager } from "../middleware/accessManager.js";

import { upload } from "../config/multer.config.js";

const userRouter = express.Router();

userRouter.get("/verifyToken", verifyCookiesToken);
userRouter.delete("/deleteToken", deleteToken);

userRouter.get("/allEvent", authMiddleware, accessManager(["admin", "professor"]), getAllInProgressEvent);
userRouter.get("/event", authMiddleware, accessManager(["admin", "professor"]), getEventById);
userRouter.get("/history", authMiddleware, accessManager(["admin", "professor"]), getAllHistoryEvent);
userRouter.get("/comment", authMiddleware, accessManager(["admin", "professor"]), getCommentById);
userRouter.post("/uploadFile", authMiddleware, accessManager(["student", "professor", "admin"]), upload.single("file"), uploadFile);

export default userRouter;