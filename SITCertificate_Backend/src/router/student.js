import express from "express";
import SignInStudent from "../controller/student/signInStudent.js";
import getAllInProgressEvent from "../controller/student/getAllInProgressEvent.js";
import getGenerateCertificate from "../controller/student/getGenerateCertificate.js";
import updateGenerateCertificate from "../controller/student/updateGenerateCertificate.js";
import getCertificate from "../controller/student/getCertificate.js";

const studentRouter = express.Router();

studentRouter.post("/login", SignInStudent);
studentRouter.get("/event", getAllInProgressEvent);
studentRouter.get("/generate", getGenerateCertificate);
studentRouter.put("/generated", updateGenerateCertificate);
studentRouter.get("/certificate", getCertificate);

export default studentRouter;
