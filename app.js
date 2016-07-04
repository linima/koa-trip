const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
const views = require('koa-views');
const co = require('co');
const convert = require('koa-convert');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser')();
const logger = require('koa-logger');
const glob = require('glob');
// require('koa-validate')(app);

//mongoose connect
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/koa2');
mongoose.connection.on('error', console.error.bind(console, '连接数据库失败'));

const models = glob.sync(__dirname +'/models/*.js');
models.forEach( model => {
  require(model);
});

// middlewares
app.use(convert(bodyparser));
app.use(convert(json()));
// app.use(convert(logger()));
app.use(require('koa-static')(__dirname + '/public'));

app.use(views(__dirname + '/views', {
  extension: 'jade'
}));

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

//routes
const index = require('./routes/index');
const users = require('./routes/users');
const vacations = require('./routes/vacations');
const admin = require('./routes/admin');

router.use('/', index.routes(), index.allowedMethods());
router.use('/users', users.routes(), users.allowedMethods());
router.use('/vacations', vacations.routes(), users.allowedMethods());
router.use('/admin', admin.routes(), users.allowedMethods());

// app.use(require('koa-body')({multipart:true , formidable:{keepExtensions:true}}));
app.use(router.routes(), router.allowedMethods());
// response

app.on('error', function(err, ctx){
  console.log(err)
  logger.error('server error', err, ctx);
});


module.exports = app;