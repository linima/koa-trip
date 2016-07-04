const mongoose = require('mongoose');
const Vacation = mongoose.model('Vacation');


exports.getVacationList = async (ctx, next) => {
  ctx.state = {
    title: 'vacation title'
  };
  await ctx.render('front/vacations',  {
  	vacations: await Vacation.find({})
  });
}

exports.getVacationContent = async (ctx, next) => {
  let id = ctx.params.id;

  ctx.state = {
    title: 'vacation detail'
  }

  await ctx.render('front/vacationsDetail', {
    vacationContent: await Vacation.findOne({_id: id})
  })
}