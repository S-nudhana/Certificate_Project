import express from "express";
import setEvent from "../controller/admin/setEvent.js";
import CreateAdmin from "../controller/admin/createAdmin.js";
import SignInAdmin from "../controller/admin/signInAdmin.js";

const adminRouter = express.Router();

adminRouter.post("/createEvent", setEvent);
adminRouter.post("/register", CreateAdmin);
adminRouter.post("/login", SignInAdmin);

export default adminRouter;
