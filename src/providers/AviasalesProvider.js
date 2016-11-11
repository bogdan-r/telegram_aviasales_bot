const axios = require('axios');
const axiosConfig = require('../lib/config/axiosAviasalesConfig');

class AviasalesProvider {
  constructor(token) {
    this.token = token;
    this.request = axios.create(axiosConfig);
  }

  pricesLatest(params) {
    return this.request.get('prices/latest', {
      params: params
    });
  }

  pricesMonthMatrix(params) {
    return this.request.get('prices/month-matrix', {
      params: params
    });
  }
}

module.exports = AviasalesProvider;