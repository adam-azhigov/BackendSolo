const Status = require("../models/Status.model");

module.exports.statusControllers = {
  getStatus: async (req, res) => {
    try {
      const allStatus = await Status.find({});
      res.status(201).json(allStatus);
    } catch (e) {
      res.json(e.message);
    }
  },

  postStatus: async (req, res) => {
    try {
      const {title, color} = req.body
      const newPatient = new Status({
        title,
        color
      });
      await newPatient.save();
      res.json(newPatient);
    } catch (e) {
      console.log(e.message);
    }
  },
};


