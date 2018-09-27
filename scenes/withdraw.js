const Scene = require('telegraf/scenes/base');
const scene = new Scene('withdraw');
const Markup = require('telegraf/markup');
const db = require('./../database');
const validAddress = require('is-ethereum-address');

const CANCEL_TEXT = 'Back 🔙';

const step = {
  state: 'set-withdrawal-address',
  withdraw_address: '',
  withdraw_value: ''
};

confirmAddress = ctx => {
  return ctx.replyWithHTML(`Your withdrawal address is <b>${step.withdraw_address}</b> is this correct?`, Markup.inlineKeyboard([Markup.callbackButton('Yes', 'confirm-address-yes'), Markup.callbackButton('No', 'confirm-address-no')]).extra());
};

confirmValue = ctx => {
  return ctx.replyWithHTML(
    `Your want to withdraw <b>${step.withdraw_value} ETH</b> to <b>${step.withdraw_address}</b> is this correct?`,
    Markup.inlineKeyboard([Markup.callbackButton('Yes', 'confirm-value-yes'), Markup.callbackButton('No', 'confirm-value-no')]).extra()
  );
};

askAddress = ctx => {
  return ctx.replyWithHTML('Please respond to us with a valid <b>ETH</b> withdrawal address.');
};

askValue = ctx => {
  return ctx.reply('How much ETH do you want to withdraw?');
};

scene.enter(async ctx => {
  console.log('withdraw scene', ctx.from.id);
  step.state = 'set-withdraw-address';
  const user = await db.findOne({ telegram_id: ctx.from.id });
  step.withdraw_address = (user || {}).withdraw_address;

  await ctx.replyWithHTML(
    '🚤 Welcome to the withdrawal process of roboqo we try to make this a speedy process.',
    Markup.keyboard([[CANCEL_TEXT]])
      .resize()
      .extra()
  );

  if (step.withdraw_address) {
    await confirmAddress(ctx);
  } else {
    await askAddress(ctx);
  }
});

scene.action('confirm-address-yes', async ctx => {
  step.state = 'set-withdraw-value';
  await ctx.answerCbQuery();
  await askValue(ctx);
});

scene.action('confirm-address-no', async ctx => {
  step.state = 'set-withdraw-address';
  await ctx.answerCbQuery();
  await askAddress(ctx);
});

scene.action('confirm-value-yes', async ctx => {
  await ctx.replyWithHTML(`Great! We will send <b>${step.withdraw_value}</b> ETH to <b>${step.withdraw_address}</b> you will recieve a transaction id by e-mail.`);
  await ctx.replyWithHTML(`⚠️ We thrive to complete the withdrawal within an hour.`);
  await ctx.answerCbQuery();
  ctx.scene.enter('welcome');
});

scene.action('confirm-value-no', async ctx => {
  await ctx.answerCbQuery();
  await askValue(ctx);
});

scene.hears(CANCEL_TEXT, ctx => ctx.scene.enter('welcome'));

scene.on('message', async ctx => {
  const message = ctx.update.message.text;

  switch (step.state) {
    case 'set-withdraw-address':
      if (validAddress(message)) {
        step.withdraw_address = message;
        await db.update({ telegram_id: ctx.from.id }, { telegram_id: ctx.from.id, withdraw_address: step.withdraw_address }, { upsert: true });
        confirmAddress(ctx);
      } else {
        ctx.reply('⚠️ Please enter a correct ethereum address.');
      }
      break;
    case 'set-withdraw-value':
      const value = parseFloat(message);
      if (value) {
        step.withdraw_value = message;
        confirmValue(ctx);
      } else {
        ctx.reply('⚠️ Please enter a correct numeric amount.');
      }
      break;
    default:
      ctx.reply('Unknown state');
      break;
  }
});

scene.leave(ctx => {});

module.exports = scene;
