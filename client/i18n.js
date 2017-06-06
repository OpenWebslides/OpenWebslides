import i18n from 'i18next';
import resources from './locales';

i18n.init({
  lng: 'en',
  fallbackLng: 'en',
  ns: ['common', 'signin'],
  defaultNS: 'common',
  debug: true,
  resources,

  interpolation: {
    escapeValue: false, // not needed for react!!
    formatSeparator: ',',
    format: (value, format) => {
      if (format === 'uppercase') return value.toUpperCase();
      return value;
    },
  },
});

export default i18n;
