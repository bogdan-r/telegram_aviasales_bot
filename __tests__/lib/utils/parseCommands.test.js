const parseCommands = require('../../../src/lib/utils/parseCommands');

describe('Utils', () => {
  describe('parseCommands', () => {
    it('fly parse commands', () => {
      expect(parseCommands('/лететь')).toBe('fly');
      expect(parseCommands('/полететь')).toBe('fly');
      expect(parseCommands('/улететь')).toBe('fly');
      expect(parseCommands('/fly')).toBe('fly');
    });

    it('help parse commands', () => {
      expect(parseCommands('/помоги')).toBe('help');
      expect(parseCommands('/помощь')).toBe('help');
      expect(parseCommands('/help')).toBe('help');
    });
  });
});