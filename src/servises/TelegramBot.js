const TelegramBot = require('node-telegram-bot-api');
const token = process.env.BOT_TOKEN;

module.exports = new Bot(token, {polling: true}); 

