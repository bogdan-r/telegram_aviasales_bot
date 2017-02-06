const chai = require('chai');
const sinon = require('sinon');
const botAskQuestion = require('../../../src/lib/utils/botAskQuestion');
const bot = require('../../../src/servises/TelegramBot');
const assert = chai.assert;


describe('Utils', () => {
  describe('botAskQuestion', () => {
    it('should return answer for question', () => {
      const botMock = sinon.mock(bot);
      const sendMessage = botMock.expects('sendMessage');
      const onReplyToMessage = botMock.expects('onReplyToMessage');
      
      assert.equal(true, false);
    });
  });
});
