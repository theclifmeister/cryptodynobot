const Scene = require('telegraf/scenes/base');
const Stage = require('telegraf/stage');
const scene = new Scene('deposit');
const { leave } = Stage;

scene.enter(ctx => {
  ctx.reply('entering deposit scene');
});

scene.command('cancel', leave());

scene.leave(ctx => {
  ctx.reply('leavin deposit scene');
});

module.exports = scene;