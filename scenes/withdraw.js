const Scene = require('telegraf/scenes/base');
const Stage = require('telegraf/stage');
const scene = new Scene('withdraw');
const { leave } = Stage;

scene.enter(ctx => {
  ctx.reply('entering withdraw scene');
});

scene.command('cancel', leave());

scene.leave(ctx => {
  ctx.reply('leavin withdraw scene');
});

module.exports = scene;