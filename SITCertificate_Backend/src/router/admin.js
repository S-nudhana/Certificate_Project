import express from "express";
import setEvent from "../controller/admin/setEvent.js";
import CreateAdmin from "../controller/admin/creatAdmin.js";
const adminRouter = express.Router();

adminRouter.post("/createEvent", setEvent);
adminRouter.post("/register", CreateAdmin);

export default adminRouter;
