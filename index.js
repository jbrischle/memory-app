/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from './src/App';
import './src/i18n/i18n-conf';

AppRegistry.registerComponent(appName, () => App);
