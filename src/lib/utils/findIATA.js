const cases = require('../fixtures/cases.json'); //TODO перенести в mongodb

module.exports = function findIATA(city = '', cityCase) {
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
};