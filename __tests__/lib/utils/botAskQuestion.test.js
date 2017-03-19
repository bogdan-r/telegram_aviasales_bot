jest.mock('../../../src/servises/TelegramBot');
const FakeTelegramBot = require('../../../src/servises/TelegramBot');
const botAskQuestion = require('../../../src/lib/utils/botAskQuestion');

const botInstance = new FakeTelegramBot();

describe('Utils', () => {
  describe('botAskQuestion', () => {
    const messageInfoObj = { from: { id: 1 } };
    const questionField = 'emptyField';
    const question = 'В чем смысл жизни';

    beforeAll(() => {
      botInstance.__setupReplyMessage('Жизнь полное дно');
    });

    it('should return answer for question', async () => {
      const answer = await botAskQuestion(messageInfoObj, botInstance, questionField, question);

      expect(answer).toEqual({ text: 'Жизнь полное дно', field: 'emptyField' });
    });
  });
});

