import express from "express";
import setEvent from "../controller/admin/setEvent.js";
import createAdmin from "../controller/admin/createAdmin.js";
import SignInAdmin from "../controller/admin/signInAdmin.js";
import updateEventData from "../controller/admin/updateEventData.js";
import deleteEvent from "../controller/admin/deleteEvent.js";
import updateCommentStatus from "../controller/admin/updateCommentStatus.js";
import sendEmail from "../controller/admin/sendEmail.js";

const adminRouter = express.Router();

adminRouter.post("/createEvent", setEvent);
adminRouter.post("/register", createAdmin);
adminRouter.put("/updateEvent", updateEventData);
adminRouter.post("/login", SignInAdmin);
adminRouter.delete("/deleteEvent", deleteEvent);
adminRouter.put("/updateCommentStatus", updateCommentStatus);
adminRouter.post("/sendEmail", sendEmail);

export default adminRouter;