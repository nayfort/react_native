import {
  LANGUAGE_GET,
  LANGUAGE_SET,
  LANGUAGE_SET_COMPLETE,
} from '../constants/language';

export const languageGet = () => ({
  type: LANGUAGE_GET,
});

export const languageSet = (langCode) => ({
  type: LANGUAGE_SET,
  langCode,
});

export const languageSetComplete = (langCode) => ({
  type: LANGUAGE_SET_COMPLETE,
  langCode,
});
