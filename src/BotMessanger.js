const handlers = require('./handlers');
const bot = require('./servises/TelegramBot');
const parseCommands = require('./lib/utils/parseCommands');

class BotMessanger {
  constructor() {
    this.bot = bot;
    this.bot.on('text', this.handleCommands.bind(this));
  }

  handleCommands(query) {
    const command = parseCommands(query.text);
    handlers[`${command}Handler`](query, bot);
  }

}

module.exports = BotMessanger;