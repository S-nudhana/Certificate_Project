import express from "express";

import createEvent from "../controller/admin/createEvent.js";
import signUpAdmin from "../controller/admin/signUpAdmin.js";
import signInAdmin from "../controller/admin/signInAdmin.js";
import updateEventData from "../controller/admin/updateEventData.js";
import deleteEvent from "../controller/admin/deleteEvent.js";
import updateCommentStatus from "../controller/admin/updateCommentStatus.js";
import sendEmail from "../controller/admin/sendEmail.js";
import setPinForgotPassword from "../controller/admin/setPinForgotPassword.js";
import sendResetPasswordEmail from "../controller/admin/sendResetPasswordEmail.js";
import resetPassword from "../controller/admin/resetPassword.js";
import getProfessorEmail from "../controller/admin/getProfessorEmail.js";
import getEventProfessor from "../controller/admin/getEventProfessor.js";

import authMiddleware from "../middleware/authMiddleware.js";
import { accessManager } from "../middleware/accessManager.js";

const adminRouter = express.Router();

adminRouter.post("/login", signInAdmin);
adminRouter.post("/register", signUpAdmin);
adminRouter.post("/email", sendEmail);
adminRouter.post("/forgotPassword", setPinForgotPassword);
adminRouter.post("/resetPassword", resetPassword);
adminRouter.post("/resetPasswordEmail", sendResetPasswordEmail);

adminRouter.post("/event", authMiddleware, accessManager(["admin"]), createEvent);
adminRouter.put("/event", authMiddleware, accessManager(["admin"]), updateEventData);
adminRouter.delete("/event/:id", authMiddleware, accessManager(["admin"]), deleteEvent);
adminRouter.put("/comment/:id/status", authMiddleware, accessManager(["admin"]), updateCommentStatus);
adminRouter.get("/email/:id", authMiddleware, accessManager([ "admin"]), getProfessorEmail);
adminRouter.get("/professor", authMiddleware, accessManager(["admin"]), getEventProfessor);

export default adminRouter;