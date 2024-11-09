import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const category = req.query.category;
    return cb(null, `./uploads/${category}`);
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}_${file.originalname}`);
  },
});

export const upload = multer({ storage });