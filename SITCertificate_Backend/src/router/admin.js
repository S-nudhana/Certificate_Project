import express from "express";

import setEvent from "../controller/admin/setEvent.js";
import createAdmin from "../controller/admin/createAdmin.js";
import SignInAdmin from "../controller/admin/signInAdmin.js";
import updateEventData from "../controller/admin/updateEventData.js";
import deleteEvent from "../controller/admin/deleteEvent.js";
import updateCommentStatus from "../controller/admin/updateCommentStatus.js";
import sendEmail from "../controller/admin/sendEmail.js";
import setPinForgotPassword from "../controller/admin/setPinForgotPassword.js";
import sendResetPasswordEmail from "../controller/admin/sendResetPasswordEmail.js";
import resetPassword from "../controller/admin/resetPassword.js";

import authMiddleware from "../middleware/authMiddleware.js";
import { accessManager } from "../middleware/accessManager.js";

const adminRouter = express.Router();

adminRouter.post("/login", SignInAdmin);
adminRouter.post("/register", createAdmin);
adminRouter.post("/sendEmail", sendEmail);
adminRouter.post("/forgotPassword", setPinForgotPassword);
adminRouter.post("/resetPassword", resetPassword);
adminRouter.post("/sendResetPasswordEmail", sendResetPasswordEmail);

adminRouter.post("/createEvent", authMiddleware, accessManager(["admin"]), setEvent);
adminRouter.put("/updateEvent", authMiddleware, accessManager(["admin"]), updateEventData);
adminRouter.delete("/deleteEvent", authMiddleware, accessManager(["admin"]), deleteEvent);
adminRouter.put("/updateCommentStatus", authMiddleware, accessManager(["admin"]), updateCommentStatus);

export default adminRouter;