import express from "express";
import getEventById from "../controller/user/getEventById.js";
import getSearchEvent from "../controller/user/getSearchEvent.js";
import getAllInProgressEvent from "../controller/user/getAllInProgressEvent.js";
import getAllHistoryEvent from "../controller/user/getAllHistoryEvent.js";
import getCommentById from "../controller/user/getCommentById.js";
import verifyCookiesToken from "../controller/token/verifyCookiesToken.js";
import deleteToken from "../controller/token/deleteToken.js";

import authMiddleware from "../middleware/authMiddleware.js";

const userRouter = express.Router();

userRouter.get("/allEvent", authMiddleware, getAllInProgressEvent);
userRouter.get("/event", authMiddleware, getEventById);
userRouter.get("/history", authMiddleware, getAllHistoryEvent);
userRouter.get("/searchEvent", authMiddleware, getSearchEvent);
userRouter.get("/comment", authMiddleware, getCommentById);
userRouter.get("/verifyToken", verifyCookiesToken);
userRouter.delete("/deleteToken", deleteToken);

export default userRouter;