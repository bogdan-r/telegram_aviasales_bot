const axios = require('axios');
const axiosConfig = require('../../lib/config/axiosAviasalesConfig');

class AviasalesApi {
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

module.exports = AviasalesApi;