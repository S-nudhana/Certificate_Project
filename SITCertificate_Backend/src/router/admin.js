import express from "express";
import setEvent from "../controller/admin/setEvent.js";
import createAdmin from "../controller/admin/createAdmin.js";
import SignInAdmin from "../controller/admin/signInAdmin.js";
import updateEventData from "../controller/admin/updateEventData.js";
const adminRouter = express.Router();

adminRouter.post("/createEvent", setEvent);
adminRouter.post("/register", createAdmin);
adminRouter.put("/updateEvent", updateEventData);
adminRouter.post("/login", SignInAdmin);

export default adminRouter;
