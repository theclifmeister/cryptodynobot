const Scene = require('telegraf/scenes/base');
const Markup = require('telegraf/markup');
const scene = new Scene('welcome');

const WITHDRAW_TEXT = 'Withdraw';
const DEPOSIT_TEXT = 'Deposit';
const BALANCE_TEXT = 'Balance';
const HELP_TEXT = 'Help';

scene.enter(ctx => {
  console.log('welcome scene', ctx.from.id);
  ctx.reply(
    'Welcome to roboqobot!',
    Markup.keyboard([[DEPOSIT_TEXT, WITHDRAW_TEXT], [BALANCE_TEXT], [HELP_TEXT]])
      .resize()
      .extra()
  );
});

scene.hears(WITHDRAW_TEXT, ctx => ctx.scene.enter('withdraw'));
scene.hears(DEPOSIT_TEXT, ctx => ctx.scene.enter('deposit'));

scene.leave(ctx => {});

module.exports = scene;
