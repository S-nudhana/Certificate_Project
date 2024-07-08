import express from "express";
import CreateProf from "../controller/prof/createProf.js";
import SignInProf from "../controller/prof/signInProf.js";
import setNewComment from "../controller/prof/setNewComment.js";
import updateCommentStatus from "../controller/prof/updateCommentStatus.js";
import updateApproveStatus from "../controller/prof/updateApproveStatus.js";

const profRouter = express.Router();

profRouter.post("/register", CreateProf);
profRouter.post("/login", SignInProf);
profRouter.post("/newComment", setNewComment);
profRouter.put("/updateCommentStatus", updateCommentStatus);
profRouter.put("/approveEvent", updateApproveStatus);

export default profRouter;