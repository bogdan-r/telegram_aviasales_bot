import axios from 'axios';
import axiosConfig from '../lib/config/axiosAviasalesConfig';

const token = process.env.AVIASALES_TOKEN;

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

export default new AviasalesProvider(token);