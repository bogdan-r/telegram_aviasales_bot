import cases from '../fixtures/cases.json';  //TODO перенести в mongodb

export default {
  findCode(city = '', cityCase) {
    if (!city) return;
    const isExistCityCase = cityCase && typeof cityCase === 'string' && cityCase.length > 0;
    let filteredCity = city.toLowerCase().replace('-', ' ');

    let resultCity;
    for (let key in cases) {
      const currentCase = cases[key].cases[cityCase];
      const caseName = isExistCityCase && currentCase ? currentCase : cases[key].name;
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
    const isExistCodeCase = codeCase && typeof codeCase === 'string' && codeCase.length > 0;
    const caseCity = cases[code].cases[codeCase];
    return isExistCodeCase && caseCity ? caseCity : cases[code].name;
  },
};