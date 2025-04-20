import express from "express";

import signUpProf from "../controller/prof/signUpProf";
import signInProf from "../controller/prof/signInProf";
import createComment from "../controller/prof/createComment";
import updateApproveStatus from "../controller/prof/updateApproveStatus";
import deleteComment from "../controller/prof/deleteComment";
import sendEmail from "../controller/prof/sendEmail";
import setPinForgotPassword from "../controller/prof/setPinForgotPassword";
import sendResetPasswordEmail from "../controller/prof/sendResetPasswordEmail";
import resetPassword from "../controller/prof/resetPassword";

import authMiddleware from "../middleware/authMiddleware";
import { accessManager } from "../middleware/accessManager";

const profRouter = express.Router();

profRouter.post("/register", signUpProf);
profRouter.post("/login", signInProf);
profRouter.post("/email", sendEmail);
profRouter.post("/forgotPassword", setPinForgotPassword);
profRouter.post("/resetPasswordEmail", sendResetPasswordEmail);
profRouter.post("/resetPassword", resetPassword);

profRouter.post("/comment", authMiddleware, accessManager(["professor"]), createComment);
profRouter.delete("/comment/:id", authMiddleware, accessManager(["professor"]), deleteComment);
profRouter.put("/event/:id/approve", authMiddleware, accessManager(["professor"]), updateApproveStatus);

export default profRouter;