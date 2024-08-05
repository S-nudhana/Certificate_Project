import express from "express";
import getEventById from "../controller/user/getEventById.js";
import getSearchEvent from "../controller/user/getSearchEvent.js";
import getAllInProgressEvent from "../controller/user/getAllInProgressEvent.js";
import getAllHistoryEvent from "../controller/user/getAllHistoryEvent.js";
import getCommentById from "../controller/user/getCommentById.js";
import verifyToken from "../controller/user/verifyToken.js";
import deleteToken from "../controller/user/deleteToken.js";

const userRouter = express.Router();

userRouter.get("/allEvent", getAllInProgressEvent);
userRouter.get("/event", getEventById);
userRouter.get("/history", getAllHistoryEvent);
userRouter.get("/searchEvent", getSearchEvent);
userRouter.get("/comment", getCommentById);
userRouter.get("/verifyToken", verifyToken);
userRouter.delete("/deleteToken", deleteToken);

export default userRouter;
