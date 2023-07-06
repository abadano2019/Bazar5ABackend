import { __dirname } from "../utils.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + "/public/img");
  },
  filename: function (req, file, cb) {
    console.log("Nombre del archivo", file.originalname)
    console.log("usuario: XXXXXXXXXXXXXXXXXX", req.session.email)
    cb(null, "/id_doc/"+"ID_DOC - "+file.originalname);
  },
});

export const upload_file = multer({ storage: storage });
