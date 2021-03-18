const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const videoSchema = mongoose.Schema({
  writer: {
    // 쓰는 사람의 Id를 넣는 건데, Id만 넣어도
    type: Schema.Types.ObjectId,
    // User모델의 모든 정보를 불러올 수 있음 !!
    ref:'User'
  },
  title: {
    type:String,
    maxlength: 50
  },
  description: {
    type: String
  },
  privacy: {
    type: Number
  },
  views: {
    type: Number,
    default: 0
  },
  category : {
    type: String
  },
  filePath: {
    type: String
  },
  duration: {
    type: String
  },
  thumbnail: {
    type: String
  }
}, { timestamps: true});

const Video = mongoose.model("Video", videoSchema);

module.exports = { Video }; //model을 다른 곳에서 사용할 수 있게 함
