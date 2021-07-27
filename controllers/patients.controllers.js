const Patient = require("../models/Patient.model");

module.exports.patientControllers = {

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
      res.json(e.message);
    }
  },

  getPatientId: async (req, res) => {
    try {
      const {id} = req.params
      const allPatient = await Patient.findById({
        _id: id
      });
      res.json(allPatient);
    } catch (e) {
      res.json(e.message);
    }
  },

  deletePatientId: async (req, res) => {
    try {
      const {id} = req.params
      const allPatient = await Patient.findByIdAndDelete({
        _id: id,
      });
      res.status(200).json(allPatient);
    } catch (e) {
      res.json(e.message);
    }
  },

  postPatient: async (req, res) => {
    try {
      const {name, pathToImage} = req.body
      const newPatient = await new Patient({
        name,
        pathToImage,
      });
      await newPatient.save();
      res.status(200).json(newPatient);
    } catch (e) {
      res.json(e.message);
    }
  },
};


