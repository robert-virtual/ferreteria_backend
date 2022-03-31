const router = require("express").Router();
const path = require("path");
const multer = require("multer");
const multerS3 = require("multer-s3");
const uuid = require("uuid").v4;
const { S3 } = require("aws-sdk");

const s3 = new S3({
  apiVersion: "2006-03-01",
});
// necesario AWS_ACCESS_KEY_ID y AWS_SECRET_ACCESS_KEY
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "rcc-test-nodejs-upload",
    metadata: (req, file, cb) => {
      cb(null, {
        fieldname: file.fieldname,
      });
    },
    key: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, `${uuid()}${ext}`);
    },
  }),
});

router.post("/", upload.array("profile"), (req, res) => {
  res.json({
    msg: "s3",
  });
});

module.exports = router;
