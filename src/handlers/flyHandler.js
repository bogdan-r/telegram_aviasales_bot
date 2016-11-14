const parseFlyQuery = require('../lib/utils/parseFlyQuery');
const IATA = require('../lib/utils/IATA');
const AviasalesProvider = require('../providers/AviasalesProvider');

function flyHandler(message, bot) {
  const flyParams = parseFlyQuery(message.text);
  const queryParams = {
    origin: IATA.findCode(flyParams.origin, 'ro'),
    destination: IATA.findCode(flyParams.destination, 'vi'),
  };

  if (!queryParams.destination) {
    bot.sendMessage(message.from.id, 'Куда летим', {
      reply_markup: JSON.stringify(
        {
          force_reply: true
        }
      )}).then((sended) => {
        bot.onReplyToMessage(sended.chat.id, sended.message_id, (replyMessage) => {
          bot.sendMessage(message.from.id, replyMessage.text);
        });
      });
  } else {
    AviasalesProvider.pricesLatest(queryParams).then((res) => {
      bot.sendMessage(message.from.id,
`
Вылет из ${IATA.findCity(res.data.data[0].origin, 'ro')} ${IATA.findCity(res.data.data[0].destination, 'vi')} 
Стоимость: ${res.data.data[0].value} рублей
Дата вылета: ${res.data.data[0].depart_date}
Дата прилета: ${res.data.data[0].return_date}
`);
    }).catch((err) => {
      bot.sendMessage(message.from.id, 'Что то пошло не так, попробуйте еще раз');
    });

  }


}

module.exports = flyHandler;
