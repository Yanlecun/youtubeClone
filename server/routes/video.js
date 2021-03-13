const express = require("express");
const router = express.Router();
//const { Video } = require("../models/Video.js");

const { auth } = require("../middleware/auth.js");
const multer = require("multer");

// STORAGE MULTER CONFIG
let storage = multer.diskStorage({
  //파일을 어디에 저장할지에 대해서 명세
  desination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  //파일 이름을 어떻게 저장할지
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  //파일 확장자는 뭐만 가능하게 할지
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".mp4" || ext !== ".jpg") {
      return cb(res.status(400).end("only mp4 is allowed"), false);
    }
    cb(null, true);
  },
});
const upload = multer({ storage: storage }).single("file");

router.post("/uploadfiles", (req, res) => {
  // 비디오 서버에 저장
  upload(req, res, err => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.json({
      success: true,
      // 동영상 저장주소
      url: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

module.exports = router;
