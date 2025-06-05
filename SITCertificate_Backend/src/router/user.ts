import express from "express";

import getEventById from "../controller/user/getEventById";
import getInProgressEvent from "../controller/user/getInProgressEvent";
import getHistoryEvent from "../controller/user/getHistoryEvent";
import getSearchEvent from "../controller/user/getSearchEvent";
import getCommentById from "../controller/user/getCommentById";
import verifyCookiesToken from "../controller/token/verifyCookiesToken";
import deleteToken from "../controller/token/deleteToken";
import uploadFile from "../controller/user/uploadFile";
import getStatistics from "../controller/user/getStatistics";

import authMiddleware from "../middleware/authMiddleware";
import { accessManager } from "../middleware/accessManager";

import { upload } from "../config/multer.config";

const userRouter = express.Router();

userRouter.get("/token", verifyCookiesToken);
userRouter.delete("/token", deleteToken);

userRouter.get("/event", authMiddleware, accessManager(["admin", "professor"]), getInProgressEvent);
userRouter.get("/event/search", authMiddleware, accessManager(["admin", "professor"]), getSearchEvent);
userRouter.get("/event/:id", authMiddleware, accessManager(["admin", "professor"]), getEventById);
userRouter.get("/history", authMiddleware, accessManager(["admin", "professor"]), getHistoryEvent);
userRouter.get("/comment", authMiddleware, accessManager(["admin", "professor"]), getCommentById);
userRouter.get("/statistic", authMiddleware, accessManager(["admin", "professor"]), getStatistics);
userRouter.post("/uploadFile", authMiddleware, accessManager(["student", "professor", "admin"]), upload.single("file"), uploadFile);

export default userRouter;