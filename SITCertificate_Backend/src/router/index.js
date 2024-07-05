const express = require("express");
const profRouter = require("./prof");

const mainRouter = express.Router();

mainRouter.use("/prof", profRouter);

module.exports = mainRouter;