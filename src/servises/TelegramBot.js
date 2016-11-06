const TelegramBot = require('node-telegram-bot-api');
const token = process.env.BOT_TOKEN;

module.exports = new TelegramBot(token, {polling: true}); 

