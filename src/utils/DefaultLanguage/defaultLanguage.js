import React from 'react';
import { NativeModules, Platform } from 'react-native';

/*To install default localization app depending on the phone*/
const defaultLanguage = (setLanguage) => {
  let deviceLanguage =
    Platform.OS === 'ios'
      ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
      : NativeModules.I18nManager.localeIdentifier;

  deviceLanguage = deviceLanguage.split('_');

  deviceLanguage[0] === 'en'
    ? setLanguage('eng')
    : deviceLanguage[0] === 'de'
    ? setLanguage('de')
    : deviceLanguage[0] === 'es'
    ? setLanguage('esp')
    : deviceLanguage[0] === 'ru'
    ? setLanguage('ru')
    : deviceLanguage[0] === 'fr'
    ? setLanguage('fr')
    : deviceLanguage[0] === 'it'
    ? setLanguage('it')
    : deviceLanguage[0] === 'tk'
    ? setLanguage('tuek')
    : deviceLanguage[0] === 'zh'
    ? setLanguage('zh')
    : deviceLanguage[0] === 'ja'
    ? setLanguage('ja')
    : deviceLanguage[0] === 'vi'
    ? setLanguage('vi')
    : deviceLanguage[0] === 'pt'
    ? setLanguage('pt')
    : deviceLanguage[0] === 'ko'
    ? setLanguage('ko')
    : setLanguage('eng');
};

export default defaultLanguage;
