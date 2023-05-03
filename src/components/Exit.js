import { Alert, BackHandler } from 'react-native';
import localisation from '../assets/staticLocalisation';

export default (langCode) => {
  /*Function exit from app*/
  const exit = () => BackHandler.exitApp();

  Alert.alert(localisation.exitTitle[`name_${langCode}`], localisation.exitMessage[`name_${langCode}`], [
    { text: localisation.exitCancel[`name_${langCode}`], style: 'cancel' },
    { text: localisation.exitConfirm[`name_${langCode}`], onPress: exit },
  ]);
};
