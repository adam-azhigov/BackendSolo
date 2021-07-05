const { Schema, model, } = require("mongoose");

const patientSchema = new Schema(
  {
    name: {
      type:String,
      required: true
    },
    pathToImage: {
      type: String,
      required: true
    },
    comment : {
      ref: "comment",
      type: Schema.Types.ObjectId,
    }
  },
  { timestamps: true }
);
const Patient = model("Patient", patientSchema)

module.exports = Patient
