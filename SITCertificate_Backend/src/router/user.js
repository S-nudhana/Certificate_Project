import express from "express";

import getEventById from "../controller/user/getEventById.js";
import getInProgressEvent from "../controller/user/getInProgressEvent.js";
import getHistoryEvent from "../controller/user/getHistoryEvent.js";
import getSearchEvent from "../controller/user/getSearchEvent.js";
import getCommentById from "../controller/user/getCommentById.js";
import verifyCookiesToken from "../controller/token/verifyCookiesToken.js";
import deleteToken from "../controller/token/deleteToken.js";
import uploadFile from "../controller/user/uploadFile.js";
import getStatistics from "../controller/user/getStatistics.js";

import authMiddleware from "../middleware/authMiddleware.js";
import { accessManager } from "../middleware/accessManager.js";

import { upload } from "../config/multerConfig.js";

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