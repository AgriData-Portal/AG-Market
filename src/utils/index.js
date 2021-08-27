import Strings from './language';
import * as chatRoom from './chats';
import * as marketPlace from './marketplace';
import * as orders from './orders';
import * as tasks from './tasks';
import * as authentication from './authentication';

export default Strings;
export {chatRoom, marketPlace, orders, tasks, authentication};

const MODE = 'DEBUG';

export const log = (text, colour = 'white') => {
  var colourASCII =
    colour == 'green'
      ? '\x1b[32m'
      : colour == 'red'
      ? '\x1b[31m'
      : colour == 'yellow'
      ? '\x1b[33m'
      : colour == 'cyan'
      ? '\x1b[36m'
      : colour == 'magenta'
      ? '\x1b[35m'
      : colour == 'blue'
      ? '\x1b[34m'
      : '\x1b[37m';

  if (MODE == 'DEBUG') {
    if (typeof text == 'object') {
      console.log(colourASCII + JSON.stringify(text) + '\x1b[0m');
    } else {
      console.log(colourASCII + text + '\x1b[0m');
    }
  }
};
