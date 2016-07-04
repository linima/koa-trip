const router = require('koa-router')();
const controller = require('../controllers/admin');
// const multer = require('koa-multer');
// const storage = multer.diskStorage({
//   destination: function(ctx, file, cb){
//     cb(null, './public/uploads')
//   },
//   filename: function(ctx, file, cb){
//     let fileFormat = (file.originalname).split('.');
//     cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
//   }
// });
// const upload = multer({ storage: storage });

router.get('/', controller.adminIndex);
router.get('/vacations', controller.getAdminVacationList);
router.get('/vacations/add', controller.adminVacationAdd);
// router.post('/vacations/add', controller.addVacation);
router.get('/vacations/del/:id', controller.removeVacation);
router.get('/vacations/edit/:id', controller.adminVacationEdit);
// router.post('/vacations/edit/:id', controller.editVacation);

router.post('/vacations/save', controller.saveVacation);
router.post('/vacations/save/:id', controller.saveVacation);

// router.get('/:id', controller.getVacationContent);
// router.post('/vacations/add', cpUpload controller.addVacation);

module.exports = router;