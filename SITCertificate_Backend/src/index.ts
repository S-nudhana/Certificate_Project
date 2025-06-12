import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import helmet from "helmet";

import db from "./db/connection";
import { corsOptions } from "./config/cors.config";
import { limiter } from "./middleware/limiter";
import { logger } from "./middleware/logger";

import adminRouter from "./router/admin";
import profRouter from "./router/prof";
import studentRouter from "./router/student";
import userRouter from "./router/user";
import getFile from "./controller/getFile";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(logger);
app.use(
  helmet()
);
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

db.connect((error: Error | null) => {
  if (error) {
    console.error("Error:", error);
  } else {
    console.log("Connected to the database");
  }
});
app.use("*", limiter);
app.get('/api/test', (req, res) => {
  res.status(200).json({ message: 'Test API workingggg!' });
});
app.get('/api/file', getFile);
app.use('/api/user', userRouter);
app.use('/api/admin', adminRouter);
app.use('/api/prof', profRouter);
app.use('/api/student', studentRouter);

app.listen(PORT, () => {
  console.log(`Server running on PORT:${PORT}`);
});
