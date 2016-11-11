function flyHandler(message, bot) {
  console.log('query', message);
  bot.sendMessage(message.from.id, 'Fly handler');
}

module.exports = flyHandler;
