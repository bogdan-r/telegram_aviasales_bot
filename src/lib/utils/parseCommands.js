import _ from 'lodash';
import commands from '../config/commands';


export default function parseCommands(query) {
  return _.findKey(commands, (command) => query.search(command) === 0);
};