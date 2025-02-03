import express from "express";

import CreateProf from "../controller/prof/createProf.js";
import SignInProf from "../controller/prof/signInProf.js";
import setNewComment from "../controller/prof/setNewComment.js";
import updateApproveStatus from "../controller/prof/updateApproveStatus.js";
import deleteComment from "../controller/prof/deleteComment.js";
import sendEmail from "../controller/prof/sendEmail.js";
import setPinForgotPassword from "../controller/prof/setPinForgotPassword.js";
import sendResetPasswordEmail from "../controller/prof/sendResetPasswordEmail.js";
import resetPassword from "../controller/prof/resetPassword.js";

import authMiddleware from "../middleware/authMiddleware.js";
import { accessManager } from "../middleware/accessManager.js";

const profRouter = express.Router();

profRouter.post("/register", CreateProf);
profRouter.post("/login", SignInProf);
profRouter.post("/email", sendEmail);
profRouter.post("/forgotPassword", setPinForgotPassword);
profRouter.post("/resetPasswordEmail", sendResetPasswordEmail);
profRouter.post("/resetPassword", resetPassword);

profRouter.post("/comment", authMiddleware, accessManager(["professor"]), setNewComment);
profRouter.delete("/comment/:id", authMiddleware, accessManager(["professor"]), deleteComment);
profRouter.put("/event/:id/approve", authMiddleware, accessManager(["professor"]), updateApproveStatus);

export default profRouter;