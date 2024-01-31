import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

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
i18n.use(initReactI18next).init({
  resources,
  lng: 'de',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
