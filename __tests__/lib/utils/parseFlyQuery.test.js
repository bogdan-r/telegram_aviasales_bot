const parseFlyQuery = require('../../../src/lib/utils/parseFlyQuery');

const queryPrefix = '/улететь';
const origin = 'из Санкт-Перербурга';
const destination = 'в Ростов на Дону';
const dateFly = '24.10'; 
const query = `${queryPrefix} ${origin} ${destination} ${dateFly}`;
const queryRevert = `${queryPrefix} ${destination} ${origin} ${dateFly}`;
const queryWithoutDate = `${queryPrefix} ${origin} ${destination} `;
const queryWithoutOrigin = `${queryPrefix} ${destination} ${dateFly}`;
const queryWithoutDestination = `${queryPrefix} ${origin}`;

describe('Utils', () => {
  describe('parseFlyQuery', () => {
    it('full query', () => {
      const queryResult = parseFlyQuery(query);

      expect({
        origin: queryResult.origin,
        destination: queryResult.destination,
        date: queryResult.date,
      }).toEqual({
        origin: 'Санкт-Перербурга',
        destination: 'в Ростов на Дону',
        date: '24.10',
      });
    });

    it('full revert query', () => {
      const queryResult = parseFlyQuery(queryRevert);
      expect({
        origin: queryResult.origin,
        destination: queryResult.destination,
        date: queryResult.date,
      }).toEqual({
        origin: 'Санкт-Перербурга',
        destination: 'в Ростов на Дону',
        date: '24.10',
      });
    });

    it('query without date', () => {
      const queryResult = parseFlyQuery(queryWithoutDate);
      expect({
        origin: queryResult.origin,
        destination: queryResult.destination,
        date: queryResult.date,
      }).toEqual({
        origin: 'Санкт-Перербурга',
        destination: 'в Ростов на Дону',
        date: null,
      });
    });

    it('query without origin fly point', () => {
      const queryResult = parseFlyQuery(queryWithoutOrigin);
      expect({
        origin: queryResult.origin,
        destination: queryResult.destination,
        date: queryResult.date,
      }).toEqual({
        origin: null,
        destination: 'в Ростов на Дону',
        date: '24.10'
      });
    });

    it('query without destination fly point', () => {
      const queryResult = parseFlyQuery(queryWithoutDestination);
      expect({
        origin: queryResult.origin,
        destination: queryResult.destination,
        date: queryResult.date,
      }).toEqual({
        origin: 'Санкт-Перербурга',
        destination: null,
        date: null
      });
    });
  });
});