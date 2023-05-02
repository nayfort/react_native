import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, Linking, Platform } from 'react-native';
import { nativeApplicationVersion } from 'expo-application';

import {
  appName,
  rateMessage,
  noThx,
  rate,
} from '../assets/staticLocalisation.json';
import { GOOGLE_PLAY_ID, APPLE_APP_ID } from '../constants/bundleIDs';

/*Confirm rate app in store*/
const confirmRate = () => {
  if (Platform.OS === 'ios') {
    Linking.openURL(
      `itms-apps://itunes.apple.com/app/id${APPLE_APP_ID}`
    ).catch((err) => Alert.alert(err.message));
  } else {
    Linking.openURL(`market://details?id=${GOOGLE_PLAY_ID}`).catch((err) =>
      Alert.alert(err.message)
    );
  }
};

/*Call user to install rate app*/
export const rateAlert = (langCode) => {
  Alert.alert(
    `${appName[`name_${langCode}`]} ` /*v${nativeApplicationVersion}*/,
    rateMessage[`name_${langCode}`],
    [
      { text: noThx[`name_${langCode}`], style: 'cancel' },
      {
        text: rate[`name_${langCode}`],
        onPress: () => confirmRate(),
      },
    ]
  );
};

export default rateAlert;

const Cancel = () => AsyncStorage.setItem('rateDate', String(-1));
const Later = () =>
  AsyncStorage.setItem('rateDate', String(new Date().getTime()));

/*Waite 10 days for new rate alert*/
export const check10Days = (langCode) => {
  AsyncStorage.getItem('rateDate').then((value) => {
    const exDate = +value;
    const currentDate = new Date().getTime();

    switch (exDate) {
      case -1: {
        break;
      }
      case null: {
        AsyncStorage.setItem('rateDate', String(currentDate));
        break;
      }
      default: {
        const ten = 1000 * 60 * 60 * 24 * 10;

        if (currentDate - exDate >= ten) {
          Alert.alert(
            `${appName[`name_${langCode}`]} ` /*v${nativeApplicationVersion}*/,
            rateMessage[`name_${langCode}`],
            [
              {
                text: noThx[`name_${langCode}`],
                style: 'cancel',
                onPress: () => Cancel,
              },
              {
                text: rate[`name_${langCode}`],
                onPress: confirmRate,
              },
              {
                text: 'Later',
                onPress: Later,
              },
            ]
          );
        }
        break;
      }
    }
  });
};
