import { Alert, BackHandler } from 'react-native';

import {
  exitCancel,
  exitConfirm,
  exitMessage,
  exitTitle,
} from '../assets/staticLocalisation.json';

export default (langCode) => {
  /*Function exit from app*/
  const exit = () => BackHandler.exitApp();

  Alert.alert(exitTitle[`name_${langCode}`], exitMessage[`name_${langCode}`], [
    { text: exitCancel[`name_${langCode}`], style: 'cancel' },
    { text: exitConfirm[`name_${langCode}`], onPress: exit },
  ]);
};
