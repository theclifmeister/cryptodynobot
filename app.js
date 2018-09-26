const Telegraf = require('telegraf');
const Stage = require('telegraf/stage');
const session = require('telegraf/session');
const bot = new Telegraf(process.env.BOT_TOKEN);

const stage = new Stage();
stage.register(require('./scenes/welcome'));
stage.register(require('./scenes/withdraw'));
stage.register(require('./scenes/deposit'));

bot.use(session());
bot.use(stage.middleware());

bot.start(ctx => {
  ctx.scene.enter('welcome');
});

bot.on('message', ctx => {
  ctx.scene.enter('welcome');
});

console.log('Running bot');
bot.startPolling();
