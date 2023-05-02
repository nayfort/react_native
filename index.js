import { AppRegistry, Platform, LogBox } from 'react-native';

import App from './App';

AppRegistry.registerComponent('Knots_3D', () => App);

if (Platform.OS === 'web') {
  const rootTag =
    document.getElementById('root') || document.getElementById('main');

  AppRegistry.runApplication('Knots_3D', { rootTag });
}
LogBox.ignoreLogs(['Remote debugger']);
