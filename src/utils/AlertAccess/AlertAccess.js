import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import localisation from '../../assets/staticLocalisation';

/*Save user answer*/
const saveData = async () => {
  try {
    await AsyncStorage.setItem('access', 'true');
  } catch (e) {
    alert('Failed to save the data to the storage');
  }
};

/*Function for get user accessed use knots API*/
const AlertAccess = (exitApp, langCode) =>
  Alert.alert(
    'Used content provided by API. original source - https://knots.llill.xyz/',
    '',
    [
      {
        text: localisation.exitCancel[`name_${langCode}`],
        onPress: () => exitApp(langCode),
      },
      { text: localisation.exitConfirm[`name_${langCode}`], onPress: () => saveData() },
    ],
    { cancelable: false }
  );

export default AlertAccess;
