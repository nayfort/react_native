import AsyncStorage from '@react-native-async-storage/async-storage';
import { put, takeLatest } from 'redux-saga/effects';
import { Alert, NativeModules, Platform } from 'react-native';

import { LANGUAGE_GET, LANGUAGE_SET } from '../constants/language';
import { languageSetComplete } from '../actions/language';

function* getLanguage() {
  try {
    /*Get all languages*/
    const langCode = yield AsyncStorage.getItem('language');

    /*Finding locale first language*/
    if (langCode) {
      yield put(languageSetComplete(langCode));
    } else {
      let locale = '';

      if (Platform.OS === 'ios') {
        locale = NativeModules.SettingsManager.settings.AppleLocale;
      } else {
        locale = NativeModules.I18nManager.localeIdentifier;
      }
      const localeFirst = locale.split('_')[0];

      switch (localeFirst) {
        case 'de': {
          yield setLanguage({ langCode: 'de' });
          break;
        }
        case 'es': {
          yield setLanguage({ langCode: 'esp' });
          break;
        }
        case 'ru':
        case 'uk': {
          yield setLanguage({ langCode: 'ru' });
          break;
        }
        case 'fr': {
          yield setLanguage({ langCode: 'fr' });
          break;
        }
        case 'it': {
          yield setLanguage({ langCode: 'it' });
          break;
        }
        case 'tr': {
          yield setLanguage({ langCode: 'tuek' });
          break;
        }
        default: {
          yield setLanguage({ langCode: 'eng' });
        }
      }
    }
  } catch (err) {
    Alert.alert('Something went wrong!', err.message);
  }
}

function* setLanguage({ langCode }) {
  try {
    yield AsyncStorage.setItem('language', langCode);

    yield put(languageSetComplete(langCode));
  } catch (err) {
    Alert.alert('Something went wrong!', err.message);
  }
}

export default function* photosSaga() {
  yield takeLatest(LANGUAGE_SET, setLanguage);
  yield takeLatest(LANGUAGE_GET, getLanguage);
}
