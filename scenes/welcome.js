const Scene = require('telegraf/scenes/base');
const Markup = require('telegraf/markup');
const scene = new Scene('welcome');

const WITHDRAW_TEXT = 'Withdraw 📤';
const DEPOSIT_TEXT = 'Deposit 💵';
const BALANCE_TEXT = 'Balance 💰';
const HELP_TEXT = 'Help 📧';

scene.enter(async ctx => {
  console.log('welcome scene', ctx.from.id);
  await ctx.replyWithHTML(
    'Welcome to roboqobot, the telegram bot to interact with the <b>roboqo</b> trading platform!',
    Markup.keyboard([[DEPOSIT_TEXT, WITHDRAW_TEXT], [BALANCE_TEXT, HELP_TEXT]])
      .resize()
      .extra()
  );

});

scene.hears(WITHDRAW_TEXT, ctx => ctx.scene.enter('withdraw'));
scene.hears(DEPOSIT_TEXT, ctx => ctx.scene.enter('deposit'));
scene.hears(BALANCE_TEXT, async ctx => {
  await ctx.replyWithHTML('Your current balance is <b>12.4 ETH</b> where <b>0.4 ETH</b> is actively used in a fund.');
});
scene.hears(HELP_TEXT, async ctx => {
  await ctx.replyWithHTML('For support issues you can always go to our website, or visit our telegram community.');
});

scene.leave(ctx => {});

module.exports = scene;
