const bluebird = require('bluebird');
const parseFlyQuery = require('../lib/utils/parseFlyQuery');
const IATA = require('../lib/utils/IATA');
const AviasalesProvider = require('../providers/AviasalesProvider');
const ERROR_MESSAGE = 'Что то пошло не так, попробуйте еще раз';

function askQuestion(message, bot, askMessage) {
  return new Promise((resolve, reject) => {
    bot.sendMessage(message.from.id, askMessage, {
      reply_markup: JSON.stringify(
        {
          force_reply: true
        }
      )}).then((sended) => {
        bot.onReplyToMessage(sended.chat.id, sended.message_id, (replyMessage) => {
          if(replyMessage.text.trim() == '') reject();
          resolve(replyMessage.text);
        });
      }).catch(() => {
        reject();
      });
  });
}

function flyHandler(message, bot) {
  const flyParams = parseFlyQuery(message.text);
  const questions = [];
  const queryParams = {
    origin: IATA.findCode(flyParams.origin, 'ro'),
    destination: IATA.findCode(flyParams.destination, 'vi'),
  };

  if (!queryParams.origin) questions.push(askQuestion.bind(this, message, bot, 'Откуда летим'));
  if (!queryParams.destination) questions.push(askQuestion.bind(this, message, bot, 'Куда летим'));

  bluebird.map(questions, (questionFn) => {
    return questionFn();
  }, { concurrency: 1 }).then((answers) => {
    if (answers.some((answer) => answer === '')) {
      bot.sendMessage(message.from.id, ERROR_MESSAGE);
    }
  }).catch((err) => {
    bot.sendMessage(message.from.id, ERROR_MESSAGE);
  });
/*
  co(function* () {
    try {
      if (!queryParams.origin) yield askQuestion(message, bot, 'Откуда летим');
      if (!queryParams.destination) yield askQuestion(message, bot, 'Куда летим');
    } catch (err) {
      bot.sendMessage(message.from.id, ERROR_MESSAGE);
    }
  }).then(() => {
    AviasalesProvider.pricesLatest(queryParams).then((res) => {
      bot.sendMessage(message.from.id,
        `Вылет из ${IATA.findCity(res.data.data[0].origin, 'ro')} ${IATA.findCity(res.data.data[0].destination, 'vi')} 
        Стоимость: ${res.data.data[0].value} рублей
        Дата вылета: ${res.data.data[0].depart_date}
        Дата прилета: ${res.data.data[0].return_date}`
      );
    });

  }).catch(() => {
    bot.sendMessage(message.from.id, ERROR_MESSAGE);
  });
*/

}

module.exports = flyHandler;
