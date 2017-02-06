const axios = require('axios');
const axiosConfig = require('../lib/config/axiosAviasalesConfig');
const token = process.env.AVIASALES_TOKEN;

class AviasalesProvider {
  constructor(token) {
    this.token = token;
    this.request = axios.create(axiosConfig);
  }

  pricesLatest(params) {
    return this.request.get('prices/latest', {
      one_way: true,
      params: params
    });
  }

  pricesMonthMatrix(params) {
    return this.request.get('prices/month-matrix', {
      params: params
    });
  }
}

module.exports = new AviasalesProvider(token);