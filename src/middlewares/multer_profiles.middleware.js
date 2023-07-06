import { __dirname } from "../utils.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + "/public/img");
  },
  filename: function (req, file, cb) {
    console.log("Nombre del archivo", file.originalname)
    cb(null, "/profiles/" + req.session.email + " - " + file.originalname);
  },
});

export const upload_file_profiles = multer({ storage: storage });
