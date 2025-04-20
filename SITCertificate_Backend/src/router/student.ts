import express from "express";

import SignInStudent from "../controller/student/signInStudent.js";
import getInProgressEvent from "../controller/student/getInProgressEvent.js";
import getInProgressEventById from "../controller/student/getInProgressEventById.js";
import getCertificateGeneratedStatus from "../controller/student/getCertificateGeneratedStatus.js";
import updateCertificateGeneratedStatus from "../controller/student/updateCertificateGeneratedStatus.js";
import getCertificate from "../controller/student/getCertificate.js";
import updataCertificateInfo from "../controller/student/updataCertificateInfo.js";
import sendCertificate from "../controller/student/sendCertificate.js";
import getCertificateGenerated from "../controller/student/getCertificateGenerated.js";
import generateExampleCertificate from "../controller/student/generateSampleCertificate.js";

import authMiddleware from "../middleware/authMiddleware.js";
import { accessManager } from "../middleware/accessManager.js";

const studentRouter = express.Router();

studentRouter.post("/login", SignInStudent);

studentRouter.get("/events",authMiddleware, accessManager(["student"]), getInProgressEvent);
studentRouter.get("/event/:id", authMiddleware, accessManager(["student"]), getInProgressEventById);
studentRouter.put("/certificate/example", authMiddleware, accessManager(["student"]), generateExampleCertificate);
studentRouter.get("/certificate/:id", authMiddleware, accessManager(["student"]), getCertificate);
studentRouter.get("/certificate/:id/generate", authMiddleware, accessManager(["student"]), getCertificateGenerated);
studentRouter.get("/status/:id", authMiddleware, accessManager(["student"]), getCertificateGeneratedStatus);
studentRouter.put("/status/:id/update", authMiddleware, accessManager(["student"]), updateCertificateGeneratedStatus);
studentRouter.put("/certificate/info", authMiddleware, accessManager(["student"]), updataCertificateInfo);
studentRouter.post("/certificate", authMiddleware, accessManager(["student"]), sendCertificate);

export default studentRouter;