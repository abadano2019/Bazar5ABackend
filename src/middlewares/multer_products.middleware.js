import { __dirname } from "../utils.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + "/public/img");
  },
  filename: function (req, file, cb) {
    cb(null, "/products/"+file.originalname + " - " + Date.now());
  },
});

export const upload_file_products = multer({ storage: storage });
