const bluebird = require('bluebird');
const parseFlyQuery = require('../lib/utils/parseFlyQuery');
const IATA = require('../lib/utils/IATA');
const botAskQuestion = require('../lib/utils/botAskQuestion');
const AviasalesProvider = require('../providers/AviasalesProvider');
const ERROR_MESSAGE = 'Что то пошло не так, попробуйте еще раз';

function renderTickets(ticketsData, count) {
  return ticketsData.slice(0, count).map(getMessage).join('---')
}

function getMessage({origin, destination, value, depart_date}) {
  return `
Вылет из ${IATA.findCity(origin, 'ro')} ${IATA.findCity(destination, 'vi')} 
Стоимость: ${value} рублей
Дата вылета: ${depart_date}
  `;
};

async function collectAnswersFromQuestions(questions, bot) {
  const answers = [];
  for (let {message, field, question} of questions) {
    answers.push(await botAskQuestion(message, bot, field, question));
  }
  return answers;
}

async function flyHandler(message, bot) {
  const flyParams = parseFlyQuery(message.text);
  const questions = [];
  const params = {
    origin: IATA.findCode(flyParams.origin, 'ro'),
    destination: IATA.findCode(flyParams.destination, 'vi'),
  };

  if (!params.origin) {
    questions.push({message, field: 'origin', question: 'Откуда летим'});
  }
  if (!params.destination) {
    questions.push({message, field: 'destination', question: 'Куда летим'});
  }

  try {
    const answers = await collectAnswersFromQuestions(questions, bot);
    const queryParams = answers.reduce((acc, answer) => {
      const { text, field } = answer;
      if (text === '') throw new Error('Текст запроса пустой');
      const IATACode = IATA.findCode(text);
      if (!IATACode) throw new Error();
      acc[field] = IATACode;
      return acc;
    }, params);

    const tickets = await AviasalesProvider.pricesLatest(queryParams);
    bot.sendMessage(message.from.id, renderTickets(tickets.data.data, 5));

  } catch (error) {
    bot.sendMessage(message.from.id, ERROR_MESSAGE);
  }

}

module.exports = flyHandler;
