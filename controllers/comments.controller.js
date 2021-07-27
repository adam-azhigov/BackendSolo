const Comment = require("../models/Comment.model");

module.exports.commentControllers = {
  getPatientIDComments: async (req, res) => {
    try {
      const { id } = req.params;
      const comments = await Comment.find({
        patient: id,
      });
      res.json(comments);
    } catch (e) {
      console.log(e.message);
    }
  },

  postCommentPatientId: async (req, res) => {
    const { id } = req.params;
    const { text, status } = req.body;

    if (text.length < 5) {
      return res.json({
        error:
          "Слишком короткая заметка. Количество символов не должно быть меньше 5",
      });
    }

    try {
      const newComment = await Comment.create({
        patient: id,
        text,
        status,
      });
      return res.json(newComment);
    } catch (e) {
      return res.json(e.message);
    }
  },

  patchPatientIdComment: async (req, res) => {
    try {
      const { id } = req.params;
      const { text, status } = req.body;

      if (text.length < 5) {
        return res.json({
          error:
            "Слишком короткая заметка. Количество символов не должно быть меньше 5",
        });
      }

      const patchComment = await Comment.findByIdAndUpdate(id, {
        text,
        status
      });
      return res.json(patchComment);
    } catch (e) {
      return res.json(e.message);
    }
  },
};
