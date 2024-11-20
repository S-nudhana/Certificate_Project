import express from "express";

import getEventById from "../controller/user/getEventById.js";
import getSearchEvent from "../controller/user/getSearchEvent.js";
import getAllInProgressEvent from "../controller/user/getAllInProgressEvent.js";
import getAllHistoryEvent from "../controller/user/getAllHistoryEvent.js";
import getCommentById from "../controller/user/getCommentById.js";
import verifyCookiesToken from "../controller/token/verifyCookiesToken.js";
import deleteToken from "../controller/token/deleteToken.js";

import authMiddleware from "../middleware/authMiddleware.js";
import { accessManager } from "../middleware/accessManager.js";

import { upload } from "../config/multer.config.js";

const userRouter = express.Router();

userRouter.get("/verifyToken", verifyCookiesToken);
userRouter.delete("/deleteToken", deleteToken);
userRouter.get("/allEvent", authMiddleware, accessManager(["admin", "professor"]), getAllInProgressEvent);
userRouter.get("/event", authMiddleware, accessManager(["admin", "professor"]), getEventById);
userRouter.get("/history", authMiddleware, accessManager(["admin", "professor"]), getAllHistoryEvent);
userRouter.get("/comment", authMiddleware, accessManager(["admin", "professor"]), getCommentById);

userRouter.post("/uploadFile", authMiddleware, accessManager(["student", "professor", "admin"]), upload.single("file"), async (req, res) => {
  try {
    if (req.file) {
      const filePath = req.file.path;
      const fileName = req.file.filename;
      res.status(200).json({
        message: "File uploaded successfully",
        file: {
          fileName: fileName,
          filePath: filePath,
        },
      });
    } else {
      res.status(400).json({ message: "No file uploaded" });
    }
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default userRouter;