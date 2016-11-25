import co from 'co';
const parseFlyQuery = require('../lib/utils/parseFlyQuery');
const IATA = require('../lib/utils/IATA');
const AviasalesProvider = require('../providers/AviasalesProvider');
const ERROR_MESSAGE = 'Что то пошло не так, попробуйте еще раз';

function askQuestion(message, bot, askMessage) {
  bot.sendMessage(message.from.id, askMessage, {
    reply_markup: JSON.stringify(
      {
        force_reply: true
      }
    )}).then((sended) => {
      bot.onReplyToMessage(sended.chat.id, sended.message_id, (replyMessage) => {
        if(replyMessage.trim() == '') return Promise.reject();
        return Promise.resolve(replyMessage);
      });
    }).catch(() => {
      return Promise.reject();
    });
}

function flyHandler(message, bot) {
  const flyParams = parseFlyQuery(message.text);
  const queryParams = {
    origin: IATA.findCode(flyParams.origin, 'ro'),
    destination: IATA.findCode(flyParams.destination, 'vi'),
  };

  co(function* () {
    try {
      if (!queryParams.origin) yield askQuestion(message, bot, 'Откуда летим');
      if (!queryParams.destination) yield askQuestion(message, bot, 'Откуда летим');
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

}

module.exports = flyHandler;
