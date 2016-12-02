const chai = require('chai');
const assert = chai.assert;
const parseCommands = require('../../../src/lib/utils/parseCommands');

describe('Utils', () => {
  describe('parseCommands', () => {
    it('fly parse commands', () => {
      assert.equal('fly', parseCommands('/лететь'));
      assert.equal('fly', parseCommands('/полететь'));
      assert.equal('fly', parseCommands('/улететь'));
      assert.equal('fly', parseCommands('/fly'));
    });

    it('help parse commands', () => {
      assert.equal('help', parseCommands('/помоги'));
      assert.equal('help', parseCommands('/помощь'));
      assert.equal('help', parseCommands('/help'));
    });
  });
});