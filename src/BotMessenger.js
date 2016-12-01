import handlers from './handlers';
import bot from './servises/TelegramBot';
import parseCommands from './lib/utils/parseCommands';

export default class BotMessenger {
  constructor() {
    this.bot = bot;
    this.bot.on('text', this.handleCommands.bind(this));
  }

  handleCommands(query) {
    const command = parseCommands(query.text);
    if (handlers[`${command}Handler`]) {
      handlers[`${command}Handler`](query, bot);
    }
  }

}