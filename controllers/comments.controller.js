const Comment = require("../models/Comment.model");

const commentControllers = {
  getPatientIDComments: async (req, res) => {
    try {
      const comments = await Comment.find({
        patient: req.params.id,
      });
      res.json(comments);
    } catch (e) {
      console.log(e.message);
    }
  },

  postCommentPatientId: async (req, res) => {
    try {
      const { id } = req.params;
      const { text, status } = req.body;
      const newComment = await new Comment({
        patient: id,
        text,
        status,
      });
      await newComment.save();
      res.json(newComment);
    } catch (e) {
      res.json(e.message);
    }
  },

  patchPatientIdComment: async (req, res) => {
    try {
      const { id } = req.params;
      const { text } = req.body;

      // if (text < 8) {
      //   return res.json({ error: "Слишком короткая заметка" });
      // }

      const patchComment = await Comment.findByIdAndUpdate( id,{
        text
      });
      return res.json(patchComment);
    } catch (e) {
      return res.json(e.message)
    }
  },
};

module.exports = commentControllers;
