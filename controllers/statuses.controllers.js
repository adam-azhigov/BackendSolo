const Status = require("../models/Status.model");

const statusControllers = {
  postStatus: async (req, res) => {
    try {
      const newPatient = new Status({
        title: req.body.title,
        color: req.body.color,
      });
      await newPatient.save();
      res.json(newPatient);
    } catch (e) {
      console.log(e.message);
    }
  },
};

module.exports = statusControllers;
