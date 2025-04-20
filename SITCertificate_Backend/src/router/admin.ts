import express from "express";

import createEvent from "../controller/admin/createEvent";
import signUpAdmin from "../controller/admin/signUpAdmin";
import signInAdmin from "../controller/admin/signInAdmin";
import updateEvent from "../controller/admin/updateEvent";
import deleteEvent from "../controller/admin/deleteEvent";
import updateCommentStatus from "../controller/admin/updateCommentStatus";
import sendEmail from "../controller/admin/sendEmail";
import setPinForgotPassword from "../controller/admin/setPinForgotPassword";
import sendResetPasswordEmail from "../controller/admin/sendResetPasswordEmail";
import resetPassword from "../controller/admin/resetPassword";
import getProfessorEmail from "../controller/admin/getProfessorEmail";
import getEventProfessor from "../controller/admin/getEventProfessor";
import embedName from "../controller/admin/embedName";

import authMiddleware from "../middleware/authMiddleware";
import { accessManager } from "../middleware/accessManager";

import { upload } from "../config/multerConfig";

const adminRouter = express.Router();

adminRouter.post("/login", signInAdmin);
adminRouter.post("/register", signUpAdmin);
adminRouter.post("/email", sendEmail);
adminRouter.post("/forgotPassword", setPinForgotPassword);
adminRouter.post("/resetPassword", resetPassword);
adminRouter.post("/resetPassword/email", sendResetPasswordEmail);

adminRouter.post("/event", authMiddleware, accessManager(["admin"]), createEvent);
adminRouter.put("/event", authMiddleware, accessManager(["admin"]), updateEvent);
adminRouter.delete("/event/:id", authMiddleware, accessManager(["admin"]), deleteEvent);
adminRouter.put("/comment/:id/status", authMiddleware, accessManager(["admin"]), updateCommentStatus);
adminRouter.get("/email/:id", authMiddleware, accessManager([ "admin"]), getProfessorEmail);
adminRouter.get("/event/professor", authMiddleware, accessManager(["admin"]), getEventProfessor);
adminRouter.post("/watermark", authMiddleware, accessManager(["admin"]), upload.single("file"), embedName);

export default adminRouter;