import express from "express";

import SignInStudent from "../controller/student/signInStudent.js";
import getAllInProgressEvent from "../controller/student/getAllInProgressEvent.js";
import getAllInProgressEventById from "../controller/student/getAllInProgressEventById.js";
import getGenerateCertificate from "../controller/student/getGenerateCertificate.js";
import updateGenerateCertificate from "../controller/student/updateGenerateCertificate.js";
import getCertificate from "../controller/student/getCertificate.js";
import updataCertificateInformation from "../controller/student/updataCertificateInformation.js";
import sendCertificate from "../controller/student/sendCertificate.js";

import authMiddleware from "../middleware/authMiddleware.js";
import { accessManager } from "../middleware/accessManager.js";
import getStudentGeneratedCertificate from "../controller/student/getStudentGeneratedCertificate.js";

const studentRouter = express.Router();

studentRouter.post("/login", SignInStudent);

studentRouter.get("/event", authMiddleware, accessManager(["student"]), getAllInProgressEvent);
studentRouter.get("/eventId", authMiddleware, accessManager(["student"]), getAllInProgressEventById);
studentRouter.get("/certificate", authMiddleware, accessManager(["student"]), getCertificate);
studentRouter.get("/generateCertificate", authMiddleware, accessManager(["student"]), getStudentGeneratedCertificate);
studentRouter.get("/generateStatus", authMiddleware, accessManager(["student"]), getGenerateCertificate);
studentRouter.put("/generateStatusUpdate", authMiddleware, accessManager(["student"]), updateGenerateCertificate);
studentRouter.put("/certificateInfo", authMiddleware, accessManager(["student"]), updataCertificateInformation);
studentRouter.post("/sendCertificate", authMiddleware, accessManager(["student"]), sendCertificate);

export default studentRouter;