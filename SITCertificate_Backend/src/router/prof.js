import express from "express";
import CreateProf from "../controller/prof/createProf.js";
import SignInProf from "../controller/prof/signInProf.js";

const profRouter = express.Router();

profRouter.post("/register", CreateProf);
profRouter.post("/login", SignInProf);

export default profRouter;