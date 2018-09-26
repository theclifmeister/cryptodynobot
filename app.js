const Telegraf = require('telegraf');
const Stage = require('telegraf/stage');
const session = require('telegraf/session');
const Markup = require('telegraf/markup');
const bot = new Telegraf(process.env.BOT_TOKEN);

const stage = new Stage();
stage.register(require('./scenes/withdraw'));
stage.register(require('./scenes/deposit'));

console.log('Running bot');
bot.use(session());
bot.use(stage.middleware());

bot.start(ctx => {
  ctx.reply('Hello');
  ctx.reply(null, Markup.keyboard([
    
  ]))
});

bot.command('withdraw', ctx => {
  ctx.scene.enter('withdraw');
});

bot.command('deposit', ctx => {
  ctx.scene.enter('deposit');
});

bot.startPolling();
