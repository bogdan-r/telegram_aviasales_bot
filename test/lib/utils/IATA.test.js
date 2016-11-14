const chai = require('chai');
const assert = chai.assert;
const IATA = require('../../../src/lib/utils/IATA');

describe('Utils', () => {
  describe('IATA', () => {
    describe('#findCode', () => {
      it('should find code without cases', () => {
        const defaultIATA = IATA.findCode('Санкт-Петербург');
        const IATALowCase = IATA.findCode('санкт-петербург');
        const IATASeparateBySpace = IATA.findCode('Санкт Петербург');

        assert.equal(defaultIATA, 'LED');
        assert.equal(IATALowCase, 'LED');
        assert.equal(IATASeparateBySpace, 'LED');
      });

      it('should find code with cases', () => {
        const IDATACases = {
          ro: IATA.findCode('Санкт-Петербурга', 'ro'),
          da: IATA.findCode('Санкт-Петербургу', 'da'),
          vi: IATA.findCode('в Санкт-Петербург', 'vi'),
          tv: IATA.findCode('Санкт-Петербургом', 'tv'),
          pr: IATA.findCode('Санкт-Петербурге', 'pr'),
        };

        assert.deepEqual({
          ro: 'LED',
          da: 'LED',
          vi: 'LED',
          tv: 'LED',
          pr: 'LED',
        }, IDATACases);
      });

      it('should return undefined with null param', () => {
        assert.equal(IATA.findCode(null), undefined);
      });
    });

    describe('#findCity', () => {
      it('should find city without cases', () => {
        const city = IATA.findCity('LED');

        assert.equal('Санкт-Петербург', city);
      });

      it('should find city with cases', () => {
        const cityCases = {
          ro: IATA.findCity('LED', 'ro'),
          da: IATA.findCity('LED', 'da'),
          vi: IATA.findCity('LED', 'vi'),
          tv: IATA.findCity('LED', 'tv'),
          pr: IATA.findCity('LED', 'pr'),
        };

        assert.deepEqual({
          ro: 'Санкт-Петербурга',
          da: 'Санкт-Петербургу',
          vi: 'в Санкт-Петербург',
          tv: 'Санкт-Петербургом',
          pr: 'Санкт-Петербурге',
        }, cityCases);
      });

      it('should return undefined with null param', () => {
        assert.equal(IATA.findCity(null), undefined);
      });
    });
  });
});