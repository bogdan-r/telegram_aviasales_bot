const _ = require('lodash');
const commands = require('../config/commands');

module.exports = function parseCommands(query) {
  return _.findKey(commands, (command) => query.search(command) === 0);
};