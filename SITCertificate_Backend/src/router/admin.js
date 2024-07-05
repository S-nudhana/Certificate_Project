import express from "express";
import setEvent from "../controller/admin/setEvent.js";

const adminRouter = express.Router();

adminRouter.post("/createEvent", setEvent);

export default adminRouter;
