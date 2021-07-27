const { Router } = require("express");

const router = Router();
const { commentControllers } = require("../controllers/comments.controller");

router.get("/patient/:id/comments", commentControllers.getPatientIDComments);
router.post("/patient/:id/comments", commentControllers.postCommentPatientId);
router.patch('/comment/:id',commentControllers.patchPatientIdComment)

module.exports = router;
