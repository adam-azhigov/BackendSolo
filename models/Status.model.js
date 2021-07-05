const { Schema, model } = require("mongoose");

const statusSchema = new Schema(
  {
    title: {
      type:String,
      required: true,
      unique: true
    },
    color: {
      type: String,
      default: "red"
    },
  },
  { timestamps: true }
);

const Status = model('Status', statusSchema)

module.exports = Status;
