const mongoose = require("mongoose");

const Message = mongoose.model("Message", {
  userId: String,
  name: String,
  message: {
    type: String,
    required: true
  },
  datetime: Date,
});

module.exports = Message;
