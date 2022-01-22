const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentsSchema = mongoose.Schema({
  writer: {
    type: Schema.Types.ObjectId,
    ref:'User'
  },
  videoId: {
    type: Schema.Types.ObjectId,
    ref: 'Video'
  },
  responseTo: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  content: {
    type: String
  }
}, { timestamps: true});

const Comments = mongoose.model("Comments", CommentsSchema);

module.exports = { Comments }; //model을 다른 곳에서 사용할 수 있게 함
