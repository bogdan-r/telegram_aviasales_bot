const aviasalesApiToken = process.env.AVIASALES_TOKEN;

module.exports = {
  baseURl: 'http://api.travelpayouts.com/v2',
  headers: {
    'X-Access-Token': aviasalesApiToken,
  },
};
