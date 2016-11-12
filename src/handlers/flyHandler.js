const parseFlyQuery = require('../lib/utils/parseFlyQuery');
const findIATA = require('../lib/utils/findIATA');
const AviasalesProvider = require('../providers/AviasalesProvider');

function flyHandler(message, bot) {
  const flyParams = parseFlyQuery(message.text);
  const queryParams = {
    origin: findIATA(flyParams.origin, 'ro'),
    destination: findIATA(flyParams.destination, 'vi'),
  };

  AviasalesProvider.pricesLatest(queryParams).then((res) => {
    bot.sendMessage(message.from.id,
`
Вылет из ${res.data.data[0].origin} в ${res.data.data[0].destination} 
Стоимость: ${res.data.data[0].value} рублей
Дата вылета: ${res.data.data[0].depart_date}
Дата прилета: ${res.data.data[0].return_date}
`);
  }).catch((err) => {

  });

}

module.exports = flyHandler;
