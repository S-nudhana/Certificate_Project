import express from "express";
import CreateProf from "../controller/prof/createProf.js";
import SignInProf from "../controller/prof/signInProf.js";
import setNewComment from "../controller/prof/setNewComment.js";
import updateApproveStatus from "../controller/prof/updateApproveStatus.js";
import deleteComment from "../controller/prof/deleteComment.js";
import getProfessorEmail from "../controller/prof/getProfessorEmail.js";
import sendEmail from "../controller/prof/sendEmail.js";
import setPinForgotPassword from "../controller/prof/setPinForgotPassword.js";
import sendResetPasswordEmail from "../controller/prof/sendResetPasswordEmail.js";
import resetPassword from "../controller/prof/resetPassword.js";

const profRouter = express.Router();

profRouter.post("/register", CreateProf);
profRouter.post("/login", SignInProf);
profRouter.post("/newComment", setNewComment);
profRouter.put("/approveEvent", updateApproveStatus);
profRouter.delete("/deleteComment", deleteComment);
profRouter.get("/email", getProfessorEmail);
profRouter.post("/sendEmail", sendEmail);
profRouter.post("/forgotPassword", setPinForgotPassword);
profRouter.post("/sendResetPasswordEmail", sendResetPasswordEmail);
profRouter.post("/resetPassword", resetPassword);

export default profRouter;