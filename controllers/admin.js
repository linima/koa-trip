const mongoose = require('mongoose');
const Vacation = mongoose.model('Vacation');


//后台管理首页
exports.adminIndex = async (ctx, next) => {
  ctx.body = '这是后台管理首页'
}

//预订列表页面
exports.getAdminVacationList = async (ctx, next) => {
  ctx.state = {
    title: '预订列表'
  };
  await ctx.render('admin/vacations',  {
  	vacations: await Vacation.find({})
  });
}

//预订新增页面
exports.adminVacationAdd = async (ctx, next) => {
  ctx.state = {
    title: '新增预订'
  };
  await ctx.render('admin/vacationsAdd', {
    action: '/admin/vacations/save',
    vacationContent: {}
  });
}

//编辑预订
exports.adminVacationEdit = async (ctx, next) => {
  let id = ctx.params.id;
  ctx.state = {
    title: '编辑预订'
  };
  await ctx.render('admin/vacationsSubmit', {
    action: '/admin/vacations/save/'+ id,
    vacationContent: await Vacation.findOne({_id: id})
  });
}

//保存预订
exports.saveVacation = async (ctx, next) => {
  let id = ctx.params.id;
  let data = ctx.request.body;
  if(Boolean(id)){
    //编辑
    await Vacation.update({_id: id}, {
      $set: data
    });
    ctx.redirect('/admin/vacations');
  }else{
    //新增
    let vacation = new Vacation(data);
    await vacation.save(function(err){
      if(err){
        ctx.body = error;
      }else{
        ctx.redirect('/admin/vacations');
      }
    })
  }
}

//删除预订提交
exports.removeVacation = async (ctx, next) => {
  let id = ctx.params.id;
  await Vacation.remove({_id: id}, function(err, docs){
    // console.log('delete----'+ docs);
    ctx.redirect('/admin/vacations');
  });
}

//编辑预订提交
// exports.editVacation = async (ctx, next) => {
//   let id = ctx.params.id;
//   let data = ctx.request.body;
//   // let vacationContent = await Vacation.findOne(id);
//   await Vacation.update({_id: id}, {
//     $set: data
//   });
//   ctx.redirect('/admin/vacations');
//   // await Vacation.findOne({_id: id});
//   // ctx.body = '提交修改'
// }

//新增预订提交
// exports.addVacation = async (ctx, next) => {
//   let data = ctx.request.body;
//   let vacation = new Vacation(data);
//   await vacation.save(function(error){
//     if(error){
//       ctx.body = error;
//     }else{
//       ctx.redirect('/admin/vacations');
//     }
//   });
// }