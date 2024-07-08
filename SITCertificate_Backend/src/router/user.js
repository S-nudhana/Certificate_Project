import express from "express";
import getEventById from "../controller/user/getEventById.js";
import getSearchEvent from "../controller/user/getSearchEvent.js";
import getAllInProgressEvent from "../controller/user/getAllInProgressEvent.js";
import getAllHistoryEvent from "../controller/user/getAllHistoryEvent.js";
import getCommentById from "../controller/user/getCommentById.js";

const userRouter = express.Router();

userRouter.get("/allEvent", getAllInProgressEvent);
userRouter.get("/event", getEventById);
userRouter.get("/history", getAllHistoryEvent);
userRouter.get("/searchEvent", getSearchEvent);
userRouter.get("/comment", getCommentById);

export default userRouter;
