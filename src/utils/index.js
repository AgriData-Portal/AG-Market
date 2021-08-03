import Strings from './language';

export default Strings;

const MODE = 'PRODUCTION';

export const log = text => {
  if (MODE == 'DEBUG') {
    console.log(text);
  }
};
