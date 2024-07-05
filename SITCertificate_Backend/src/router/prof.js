import express from "express";
import CreateProf from "../controller/prof/createProf.js";

const profRouter = express.Router();

profRouter.post("/register", CreateProf);

export default profRouter;