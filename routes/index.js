const {Router} = require('express')

const router = Router();

router.use(require('./patients.route'))
router.use(require('./comments.route'))
router.use(require('./statuses.route'))

module.exports = router