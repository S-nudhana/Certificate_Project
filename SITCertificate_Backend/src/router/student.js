import express from "express";
import SignInStudent from "../controller/student/signInStudent.js";
import getAllInProgressEvent from "../controller/student/getAllInProgressEvent.js";
import getGenerateCertificate from "../controller/student/getGenerateCertificate.js";
import updateGenerateCertificate from "../controller/student/updateGenerateCertificate.js";

const studentRouter = express.Router();

studentRouter.post("/login", SignInStudent);
studentRouter.get("/event", getAllInProgressEvent);
studentRouter.get("/generate", getGenerateCertificate)
studentRouter.put("/generated", updateGenerateCertificate)

export default studentRouter;
