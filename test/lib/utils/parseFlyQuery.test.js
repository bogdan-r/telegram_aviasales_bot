const chai = require('chai');
const assert = chai.assert;
const parseFlyQuery = require('../../../src/lib/utils/parseFlyQuery');

const queryPrefix = '/улететь';
const origin = 'из Санкт-Перербурга';
const destination = 'в Ростов на Дону';
const dateFly = '24.10'; 
const query = `${queryPrefix} ${origin} ${destination} ${dateFly}`;
const queryRevert = `${queryPrefix} ${destination} ${origin} ${dateFly}`;
const queryWithoutDate = `${queryPrefix} ${origin} ${destination} `;
const queryWithoutOrigin = `${queryPrefix} ${destination} ${dateFly}`;
const queryWithoutDestination = `${queryPrefix} ${origin} ${dateFly}`;

describe('Utils', () => {
  describe('parseFlyQuery', () => {
    it('full query', () => {
      const queryResult = parseFlyQuery(query);

      assert.deepEqual({
        origin: 'Санкт-Перербурга',
        destination: 'в Ростов на Дону',
        date: '24.10',
      }, {
        origin: queryResult.origin,
        destination: queryResult.destination,
        date: queryResult.date,
      });
    });

    it('full revert query', () => {
      const queryResult = parseFlyQuery(queryRevert);

      assert.deepEqual({
        origin: 'Санкт-Перербурга',
        destination: 'в Ростов на Дону',
        date: '24.10',
      }, {
        origin: queryResult.origin,
        destination: queryResult.destination,
        date: queryResult.date,
      });
    });

    it('query without date', () => {
      const queryResult = parseFlyQuery(queryWithoutDate);

      assert.deepEqual({
        origin: 'Санкт-Перербурга',
        destination: 'в Ростов на Дону',
        date: null,
      }, {
        origin: queryResult.origin,
        destination: queryResult.destination,
        date: queryResult.date,
      });
    });

    it('query without origin fly point', () => {
      const queryResult = parseFlyQuery(queryWithoutOrigin);

      assert.deepEqual({
        origin: null,
        destination: 'в Ростов на Дону',
        date: '24.10'
      }, {
        origin: queryResult.origin,
        destination: queryResult.destination,
        date: queryResult.date,
      });
    });

    it('query without destination fly point', () => {
      const queryResult = parseFlyQuery(queryWithoutDestination);

      assert.deepEqual({
        origin: 'Санкт-Перербурга',
        destination: null,
        date: '24.10'
      }, {
        origin: queryResult.origin,
        destination: queryResult.destination,
        date: queryResult.date,
      });
    });
  });
});