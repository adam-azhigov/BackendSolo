const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    status: {
      ref: "Status",
      type: Schema.Types.ObjectId,
    },
    patient: {
      ref: "Patient",
      type: Schema.Types.ObjectId,
    },
  },
  { timestamps: true }
);

const Comment = model("Comment", commentSchema);

module.exports = Comment;
