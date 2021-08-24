import Strings from './language';
import * as chatRoom from './chats';

export default Strings;
export {chatRoom};

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
    console.log(colourASCII + text + '\x1b[0m');
  }
};
