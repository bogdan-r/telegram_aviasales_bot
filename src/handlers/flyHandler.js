const bluebird = require('bluebird');
const parseFlyQuery = require('../lib/utils/parseFlyQuery');
const IATA = require('../lib/utils/IATA');
const botAskQuestion = require('../lib/utils/botAskQuestion');
const AviasalesProvider = require('../providers/AviasalesProvider');
const ERROR_MESSAGE = 'Что то пошло не так, попробуйте еще раз';

function flyHandler(message, bot) {
  const flyParams = parseFlyQuery(message.text);
  const questions = [];
  const queryParams = {
    origin: IATA.findCode(flyParams.origin, 'ro'),
    destination: IATA.findCode(flyParams.destination, 'vi'),
  };

  if (!queryParams.origin) questions.push(botAskQuestion.bind(this, message, bot, 'origin', 'Откуда летим'));
  if (!queryParams.destination) questions.push(botAskQuestion.bind(this, message, bot, 'destination', 'Куда летим'));

  bluebird.map(questions, (questionFn) => {
    return questionFn();
  }, { concurrency: 1 }).then((answers) => {
    if(answers.length) {
      for(let i = 0; i < answers.length; i++) {
        let text = answers[i].text;
        let field = answers[i].field;
        if(text == '') {
          throw new Error();
        } else {
          queryParams[field] = IATA.findCode(text);
          if (!queryParams[field]) throw new Error();
        }
      }
    }
    AviasalesProvider.pricesLatest(queryParams).then((res) => {
      bot.sendMessage(message.from.id,
        `
Вылет из ${IATA.findCity(res.data.data[0].origin, 'ro')} ${IATA.findCity(res.data.data[0].destination, 'vi')} 
Стоимость: ${res.data.data[0].value} рублей
Дата вылета: ${res.data.data[0].depart_date}
`
      );
    });

  }).catch(() => {
    bot.sendMessage(message.from.id, ERROR_MESSAGE);
  });
}

module.exports = flyHandler;
