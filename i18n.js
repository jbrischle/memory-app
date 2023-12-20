import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {ReactNativeLanguageDetector} from 'react-native-localization-settings';

const resources = {
  de: {
    translation: {
      restart: 'neues spiel',
    },
  },
  en: {
    translation: {
      restart: 'new game',
    },
  },
};

export default i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(ReactNativeLanguageDetector)
  .init({
    resources,
    compatibilityJSON: 'v3',
    fallbackLng: 'de',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });
