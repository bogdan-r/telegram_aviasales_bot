const Commands = require('../app/Commands');
const bot = require('./servises/TelegramBot');

class BotMessanger {
  constructor() {
    this.bot = bot;
    this.bot.on('text', this.handleCommands.bind(this));
    this.commands = new Commands(); 
  }

  handleCommands(msg) {
    
  }

}