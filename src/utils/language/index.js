import LocalizedStrings from 'react-native-localization';
import english from './english';
import malay from './malay';
import mandarin from './mandarin';

let Strings = new LocalizedStrings({
  en: english,
  ms: malay,
  zh: mandarin,
});

export default Strings;
