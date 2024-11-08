import multer from "multer";
import express from "express";
import getEventById from "../controller/user/getEventById.js";
import getSearchEvent from "../controller/user/getSearchEvent.js";
import getAllInProgressEvent from "../controller/user/getAllInProgressEvent.js";
import getAllHistoryEvent from "../controller/user/getAllHistoryEvent.js";
import getCommentById from "../controller/user/getCommentById.js";
import verifyCookiesToken from "../controller/token/verifyCookiesToken.js";
import deleteToken from "../controller/token/deleteToken.js";

import authMiddleware from "../middleware/authMiddleware.js";

const userRouter = express.Router();

userRouter.get("/allEvent", authMiddleware, getAllInProgressEvent);
userRouter.get("/event", authMiddleware, getEventById);
userRouter.get("/history", authMiddleware, getAllHistoryEvent);
userRouter.get("/searchEvent", authMiddleware, getSearchEvent);
userRouter.get("/comment", authMiddleware, getCommentById);
userRouter.get("/verifyToken", verifyCookiesToken);
userRouter.delete("/deleteToken", deleteToken);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const category = req.query.category;
    return cb(null, `./uploads/${category}`);
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

userRouter.post("/uploadFile", upload.single("file"), async (req, res) => {
  try {
    if (req.file) {
      const filePath = req.file.path;
      const fileName = req.file.filename;
      console.log(fileName)
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
