const handlers = require('./handlers');

class Commands {
  constructor(bot) {
    this.bot = bot;
  }

  parseCommands(command) {
    if (command.match(/\/(у|по)?лететь/)) {
      handlers.flyHandler(command);
    } else if (command.match(/\/присылай/)) {
      console.log('присылай', command);
    } else if (command.match(/\/(помощь|помоги|help)/)) {
      console.log('помощь', command);
    }
  }
}

module.exports = Commands;