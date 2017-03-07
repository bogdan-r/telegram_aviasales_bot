const IATA = require('../../../src/lib/utils/IATA');

describe('Utils', () => {
  describe('IATA', () => {
    describe('#findCode', () => {
      it('should find code without cases', () => {
        const defaultIATA = IATA.findCode('Санкт-Петербург');
        const IATALowCase = IATA.findCode('санкт-петербург');
        const IATASeparateBySpace = IATA.findCode('Санкт Петербург');

        expect(defaultIATA).toBe('LED');
        expect(IATALowCase).toBe('LED');
        expect(IATASeparateBySpace).toBe('LED');
      });

      it('should find code with cases', () => {
        const IDATACases = {
          ro: IATA.findCode('Санкт-Петербурга', 'ro'),
          da: IATA.findCode('Санкт-Петербургу', 'da'),
          vi: IATA.findCode('в Санкт-Петербург', 'vi'),
          tv: IATA.findCode('Санкт-Петербургом', 'tv'),
          pr: IATA.findCode('Санкт-Петербурге', 'pr'),
        };
        
        expect(IDATACases).toEqual({
          ro: 'LED',
          da: 'LED',
          vi: 'LED',
          tv: 'LED',
          pr: 'LED',
        });
      });

      it('should find code with wrong cases', () => {
        const IATAEmptyCase = IATA.findCode('Санкт-Петербург', '');
        const IATAWrongCase = IATA.findCode('Санкт-Петербург', 'wrong case');

        expect(IATAEmptyCase).toBe('LED');
        expect(IATAWrongCase).toBe('LED');
      });

      it('should return undefined with null param', () => {
        expect(IATA.findCode(null)).toBeUndefined();
      });
    });

    describe('#findCity', () => {
      it('should find city without cases', () => {
        const city = IATA.findCity('LED');

        expect(city).toBe('Санкт-Петербург');
      });

      it('should find city with cases', () => {
        const cityCases = {
          ro: IATA.findCity('LED', 'ro'),
          da: IATA.findCity('LED', 'da'),
          vi: IATA.findCity('LED', 'vi'),
          tv: IATA.findCity('LED', 'tv'),
          pr: IATA.findCity('LED', 'pr'),
        };

        expect(cityCases).toEqual({
          ro: 'Санкт-Петербурга',
          da: 'Санкт-Петербургу',
          vi: 'в Санкт-Петербург',
          tv: 'Санкт-Петербургом',
          pr: 'Санкт-Петербурге',
        });
      });

      it('should return undefined with null param', () => {
        expect(IATA.findCity(null)).toBeUndefined();
      });

      it('should find city with wrong cases', () => {
        const cityWithEmptyCase = IATA.findCity('LED', '');
        const cityWithWrongCase = IATA.findCity('LED', 'wrong case');

        expect(cityWithEmptyCase).toBe('Санкт-Петербург');
        expect(cityWithWrongCase).toBe('Санкт-Петербург');
      });
    });
  });
});
