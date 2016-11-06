const chai = require('chai');
const assert = chai.assert;
const findIATA = require('../../../src/lib/utils/findIATA');

describe('Utils', () => {
  describe('findIATA', () => {
    it('without cases', () => {
      const IATA = findIATA('Санкт-Петербург');
      const IATALowCase = findIATA('санкт-петербург');
      const IATASeparateBySpace = findIATA('Санкт Петербург');

      assert.equal(IATA, 'LED');
      assert.equal(IATALowCase, 'LED');
      assert.equal(IATASeparateBySpace, 'LED');
    });

    it('with cases', () => {
      const IDATACases = {
        ro: findIATA('Санкт-Петербурга', 'ro'),
        da: findIATA('Санкт-Петербургу', 'da'),
        vi: findIATA('в Санкт-Петербург', 'vi'),
        tv: findIATA('Санкт-Петербургом', 'tv'),
        pr: findIATA('Санкт-Петербурге', 'pr'),
      };

      assert.deepEqual({
        ro: 'LED',
        da: 'LED',
        vi: 'LED',
        tv: 'LED',
        pr: 'LED',
      }, IDATACases);
    });
  });
});
