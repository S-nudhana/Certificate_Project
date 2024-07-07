import express from "express";
import setEvent from "../controller/admin/setEvent.js";
import createAdmin from "../controller/admin/createAdmin.js";
import SignInAdmin from "../controller/admin/signInAdmin.js";
import getAllInProgressEvent from "../controller/admin/getAllInProgressEvent.js";
import getAllHistoryEvent from "../controller/admin/getAllHistoryEvent.js";
import getSearchEvent from "../controller/admin/getSearchEvent.js";
import getEventById from "../controller/admin/getEventById.js";
import updateEventData from "../controller/admin/updateEventData.js";
const adminRouter = express.Router();

adminRouter.post("/createEvent", setEvent);
adminRouter.post("/register", createAdmin);
adminRouter.get("/allEvent", getAllInProgressEvent);
adminRouter.get("/event", getEventById);
adminRouter.get("/history", getAllHistoryEvent);
adminRouter.get("/searchEvent", getSearchEvent);
adminRouter.put("/updateEvent", updateEventData);
adminRouter.post("/login", SignInAdmin);

export default adminRouter;
