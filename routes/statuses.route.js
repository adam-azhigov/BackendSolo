const { Router } = require("express");

const router = Router();

const { statusControllers } = require("../controllers/statuses.controllers");

router.post('/api/status', statusControllers.postStatus);
router.get('/api/status', statusControllers.getStatus)

module.exports = router;
