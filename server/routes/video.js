const express = require("express");
const router = express.Router();
const { Video } = require("../models/Video.js");

const multer = require("multer");
var ffmpeg = require("fluent-ffmpeg");

// STORAGE MULTER CONFIG
var storage = multer.diskStorage({
  //파일을 어디에 저장할지에 대해서 명세
  destination: (req, file, cb) => {
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
  }
});
const upload = multer({ storage }).single("file");

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
      fukeDuration: res.req.file.duration,
      filePath: res.req.file.path
    });
  });
});

router.post("/thumbnail", (req, res) => {
  let url = "";
  let fileDuration = "";

  //썸네일 생성 및 비디오 러닝타임 가져오기
  // 비디오 정보 가져오기.. 그냥 그렇구나
  ffmpeg.ffprobe(req.body.url, function (err, metadata) {
    fileDuration = metadata.format.duration;
  });

  // 썸네일 생성
  // 클라이언트에서 온 비디오 저장 경로
  ffmpeg(req.body.url)
    // 이 비디오 파일의 이름 생성
    .on("filenames", function (filenames) {
      console.log("Will generate " + filenames.join(", "));
      url = "uploads/thumbnails/" + filenames[0];
    })
    // 썸네일 생성 성공한다면 ??? res에 담아서 전송
    .on("end", function () {
      console.log("Screenshots taken");
      return res.json({ success: true, url: url, fileDuration });
    })
    //에러처리
    .on("error", (err) => {
      console.error(err);
      return res.json({ success: false, err });
    })
    //옵션
    .screenshots({
      // 3개
      count: 1,
      // 썸네일 파일 저장 위치
      folder: "uploads/thumbnails",
      // 파일 사이즈
      size: "320x240",
      // %b : 파일 원래 이름 but 확장자는 뺀 이름
      filename: "thumbnail-%b.png",
    });
});

router.post("/uploadvideo", (req, res) => {
  const video = new Video(req.body);

  //mongoDB에 저장 RDBMS랑 비슷
  video.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({ success: true });
  });
});

router.get("/getVideos", (req, res) => {
  console.log("hihi")
  // 모든 비디오를 DB에서 가져오기 by MongoDB 메소드 find
  Video.find()
    // User의 모든 정보를 video스키마에 가져올 수 있도록 하는 메소드
    // 안 하면 writer의 id만 가져오게 된다.
    .populate("writer")
    .exec((err, videos) => {
      if (err) return res.status(400).send(error);
      res.status(200).json({
        success: true,
        videos,
      });
    });
});

router.post("/getVideoDetail", (req,res) => {
    //클라이언트에서 보낸 id를 이용해서 찾기
    console.log("hihi")
    Video.findOne({"_id" : req.body.videoId})
      .populate("writer")
      .exec((err, video) => {
        if(err) {
          res.status(400).send(err)
        }
        res.status(200).json({
          success: true,
          video
        })
      })

})
module.exports = router;
