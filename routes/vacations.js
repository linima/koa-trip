const router = require('koa-router')();
const controller = require('../controllers/vacation');

router.get('/', controller.getVacationList);
router.get('/:id', controller.getVacationContent);

module.exports = router;