const Patient = require("../models/Patient.model");

const patientControllers = {
  getAllPatients: async (req, res) => {
    try {
      const allPatient = await Patient.aggregate([
        {
          $lookup: {
            from: "comments",
            as: "comments",
            let: { patient: "$_id" },
            pipeline: [
              { $match: { $expr: { $eq: ["$patient", "$$patient"] } } },
            ],
          },
        },
        {
          $lookup: {
            from: "comments",
            as: "lastComment",
            let: { patient: "$_id" },
            pipeline: [
              { $match: { $expr: { $eq: ["$patient", "$$patient"] } } },
              { $sort: {createdAt: -1}},
              {$limit: 1}
            ],
          },
        },
        {
          $project: {
            _id: 1,
            name: 1,
            pathToImage: 1,
            comments: 1,
            lastComment: 1
          },
        },
        { $unwind: { path: '$lastComment', preserveNullAndEmptyArrays: true} },
      ]);
      res.json(allPatient);
    } catch (e) {
      console.log(e.message);
    }
  },

  getPatientId: async (req, res) => {
    try {
      const allPatient = await Patient.find({
        _id: req.params.id,
      });
      res.json(allPatient);
    } catch (e) {
      console.log(e.message);
    }
  },

  deletePatientId: async (req, res) => {
    try {
      const allPatient = await Patient.findByIdAndDelete({
        _id: req.params.id,
      });
      res.json('пациент удален');
    } catch (e) {
      res.json(e.message);
    }
  },

  postPatient: async (req, res) => {
    try {
      const newPatient = await new Patient({
        name: req.body.name,
        pathToImage: req.body.pathToImage,
      });
      await newPatient.save();
      res.json(newPatient);
    } catch (e) {
      console.log(e.message);
    }
  },
};

module.exports = patientControllers;
