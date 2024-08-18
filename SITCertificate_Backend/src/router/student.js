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

const studentRouter = express.Router();

studentRouter.post("/login", SignInStudent);
studentRouter.get("/event", getAllInProgressEvent);
studentRouter.get("/generate", getGenerateCertificate);
studentRouter.put("/generated", updateGenerateCertificate);
studentRouter.get("/certificate", getCertificate);
studentRouter.put("/certificateinfo", updataCertificateInformation);
studentRouter.get("/info", getCertificateInfo);
studentRouter.get("/eventId", getAllInProgressEventById);
studentRouter.post("/sendCertificate", sendCertificate);

export default studentRouter;