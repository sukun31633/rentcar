import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import th from './locales/th.json';

i18next
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      th: { translation: th },
    },
    lng: 'th', // เริ่มต้นเป็นภาษาไทย
    fallbackLng: 'en', // ถ้าไม่มีภาษาในไฟล์ จะใช้ภาษาอังกฤษ
    interpolation: {
      escapeValue: false, // React จัดการการ escaping อยู่แล้ว
    },
  });

export default i18next;
