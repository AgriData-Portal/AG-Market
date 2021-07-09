/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src';
import {name as appName} from './app.json';
import codePush from 'react-native-code-push';

AppRegistry.registerComponent(appName, () => App);
//AppRegistry.registerComponent(appName, () => codePush(App));
