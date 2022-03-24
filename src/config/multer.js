const multer = require("multer");
const { v4: uuid } = require("uuid");

const storage = multer.diskStorage({
  destination(_, __, cb) {
    cb(null, "uploads");
  },
  filename(_, file, cb) {
    cb(null, `${uuid()}.${file.originalname.split(".")[1]}`);
  },
});

exports.upload = multer({ storage });
