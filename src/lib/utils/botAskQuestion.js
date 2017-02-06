function askQuestion(message, bot, field, askMessage) {
  return new Promise((resolve, reject) => {
    bot.sendMessage(message.from.id, askMessage, {
      reply_markup: JSON.stringify(
        {
          force_reply: true
        }
      )}).then((sended) => {
        bot.onReplyToMessage(sended.chat.id, sended.message_id, (replyMessage) => {
          if(replyMessage.text.trim() == '') {
            reject();
            return;
          }
          resolve({text: replyMessage.text, field: field});
        });
      }).catch(() => {
        reject();
      });
  });
}

module.exports = askQuestion;