import Strings from './language';

export default Strings;

const MODE = 'DEBUG';

export const log = text => {
  if (MODE == 'DEBUG') {
    console.log(text);
  }
};
