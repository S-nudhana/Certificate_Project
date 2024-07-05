const express = require("express");
const CreateProf = require("../controller/prof/createProf");

const profRouter = express.Router();

profRouter.post("/register", CreateProf);

module.exports = profRouter;