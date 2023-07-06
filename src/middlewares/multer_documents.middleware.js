import { __dirname } from "../utils.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + "/public/img");
  },
  filename: function (req, file, cb) {
    console.log("Nombre del archivo", file.originalname)

    let prefix = (file.originalname).substring(0,3)
    if (prefix === "ID_"){
      req.session.id_ = file.originalname
      cb(null, "/documents/id_/" + req.session.email + " - " + file.originalname);
    }

    if (prefix === "ADD"){
      req.session.add = file.originalname
      cb(null, "/documents/add/"+ req.session.email + " - " + file.originalname);
    }

    if (prefix === "EDC"){
      req.session.edc = file.originalname
      cb(null, "/documents/edc/" + req.session.email + " - " + file.originalname);
    }
  },
});

export const upload_file_documents = multer({ storage: storage });
