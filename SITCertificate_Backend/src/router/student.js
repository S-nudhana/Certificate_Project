import express from "express";
import SignInStudent from "../controller/student/signInStudent.js";
import getAllInProgressEvent from "../controller/student/getAllInProgressEvent.js";

const studentRouter = express.Router();

studentRouter.post("/login", SignInStudent);
studentRouter.get("/event", getAllInProgressEvent)

export default studentRouter;
