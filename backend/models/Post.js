const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // User 모델을 참조
      required: true,
    },
    imageUrl: {
      type: String,
    },
    tags: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
