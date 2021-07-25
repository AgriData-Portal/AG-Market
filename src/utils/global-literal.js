//TO remove console logs in release mode
const MODE = 'debug';

const log = text => {
  if (MODE == 'debug') {
    console.log(text);
  }
};

export {log};
