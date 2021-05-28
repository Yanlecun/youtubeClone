const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubscribersSchema = mongoose.Schema({
  userTo: {
    type: Schema.Types.ObjectId,
    ref:'User'
  },
  userFrom: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true});

const Subscribers = mongoose.model("Subscribers", SubscribersSchema);

module.exports = { Subscribers }; //model을 다른 곳에서 사용할 수 있게 함
