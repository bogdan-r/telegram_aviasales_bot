const aviasalesApiToken = process.env.AVIASALES_TOKEN;

export default {
  baseURL: 'http://api.travelpayouts.com/v2/',
  headers: {
    'X-Access-Token': aviasalesApiToken,
  },
};
