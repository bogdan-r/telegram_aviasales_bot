class FakeTelegramBot {
  constructor() {
    this.replyMessage = {text: ''};
  }

  sendMessage() {
    return Promise.resolve({
      chat: {
        id: 1
      },
      message_id: 1,
    });
  }

  onReplyToMessage(id, messageId, callback) {
    callback.call(this, this.replyMessage);
  }

  __setupReplyMessage(message) {
    this.replyMessage.text = message;
  }
}

module.exports = FakeTelegramBot;