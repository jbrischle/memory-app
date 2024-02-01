import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import RNLanguageDetector from '@os-team/i18next-react-native-language-detector';
import translations from './i18n.json';

i18next
  .use(RNLanguageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    fallbackLng: 'de',
    interpolation: {
      escapeValue: false,
    },
    resources: translations,
  });

export default i18next;
