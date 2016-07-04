const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VacationSchema = new Schema({
  title: { type: String, required: true },	//主标题
  subtitle: { type: String, required: true },   //副标题
  thumbnail: { type: String }, //缩略图
  price: { type: Number }, //价格，单位￥
  feature: { type: String }, //特色 卖点
  content: { type: String }, //产品详情
  fee: { type: String }, //费用说明
  notice: { type: String },  //预订须知
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Vacation', VacationSchema);