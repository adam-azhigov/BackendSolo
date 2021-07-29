const { Router } = require("express");

const router = Router();
const { commentControllers } = require("../controllers/comments.controller");

router.get("/api/patient/:id/comments", commentControllers.getPatientIDComments);
router.post("/api/patient/:id/comments", commentControllers.postCommentPatientId);
router.patch('/api/comment/:id',commentControllers.patchPatientIdComment)

module.exports = router;
