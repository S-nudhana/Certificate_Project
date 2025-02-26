import multer from "multer";

import { verifyToken } from "../controller/auth/jwt.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const category = req.query.category;
    return cb(null, `./uploads/${category}`);
  },
  filename: function (req, file, cb) {
    const token = req.cookies.token;
    const decoded = verifyToken(token);
    if (decoded.role === "student") {
      return cb(null, `${Date.now()}_${decoded.id}.pdf`);
    }
    return cb(null, `${Date.now()}_${file.originalname}`);
  },
});

export const upload = multer({ storage });