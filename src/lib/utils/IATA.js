const cases = require('../fixtures/cases.json'); //TODO перенести в mongodb

module.exports = {
  findCode(city = '', cityCase) {
    if (!city) return;
    let filteredCity = city.toLowerCase().replace('-', ' ');

    let resultCity;
    for (let key in cases) {
      const caseName = cityCase ? cases[key].cases[cityCase] : cases[key].name;
      const loopCity = caseName.toLowerCase().replace('-', ' ');
      if (loopCity === filteredCity) {
        resultCity = key;
        break;
      }
    }
    return resultCity;
  },

  findCity(code = '', codeCase) {
    if (!code) return;
    if(codeCase) {
      return cases[code].cases[codeCase];
    } else {
      return cases[code].name;
    }
  },
};