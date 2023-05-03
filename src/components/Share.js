import { Alert, Share, Platform } from 'react-native';

import { GOOGLE_PLAY_ID, APPLE_APP_ID } from '../constants/bundleIDs';
import { recommend, appName } from '../assets/staticLocalisation.json';

const ShareApp = async (langCode) => {
  try {
    const link =
      Platform.OS === 'ios'
        ? `https://itunes.apple.com/app/id${APPLE_APP_ID}`
        : `https://play.google.com/store/apps/details?id=${GOOGLE_PLAY_ID}`;

    await Share.share({
      message: `${recommend[`name_${langCode}`]} ${
        appName[`name_${langCode}`]
      } ${link}`,
      title: 'Useful Knots 3d',
    });
  } catch (error) {
    Alert.alert(error.message);
  }
};

export default ShareApp;
