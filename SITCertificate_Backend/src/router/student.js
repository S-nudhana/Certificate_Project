import express from "express";
import SignInStudent from "../controller/student/signInStudent.js";
import getAllInProgressEvent from "../controller/student/getAllInProgressEvent.js";
import getAllInProgressEventById from "../controller/student/getAllInProgressEventById.js";
import getGenerateCertificate from "../controller/student/getGenerateCertificate.js";
import updateGenerateCertificate from "../controller/student/updateGenerateCertificate.js";
import getCertificate from "../controller/student/getCertificate.js";
import updataCertificateInformation from "../controller/student/updataCertificateInformation.js";
import getCertificateInfo from "../controller/student/getCertificateInfo.js";
import sendCertificate from "../controller/student/sendCertificate.js";

import authMiddleware from "../middleware/authMiddleware.js";

const studentRouter = express.Router();

studentRouter.post("/login", SignInStudent);
studentRouter.get("/event", authMiddleware, getAllInProgressEvent);
studentRouter.get("/generate", authMiddleware, getGenerateCertificate);
studentRouter.put("/generated", authMiddleware, updateGenerateCertificate);
studentRouter.get("/certificate", authMiddleware, getCertificate);
studentRouter.put("/certificateinfo", authMiddleware, updataCertificateInformation);
studentRouter.get("/info", authMiddleware, getCertificateInfo);
studentRouter.get("/eventId", authMiddleware, getAllInProgressEventById);
studentRouter.post("/sendCertificate", authMiddleware, sendCertificate);

export default studentRouter;