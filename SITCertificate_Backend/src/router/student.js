import express from "express";
import SignInStudent from "../controller/student/signInStudent.js";

const studentRouter = express.Router();

studentRouter.post("/login", SignInStudent);

export default studentRouter;
