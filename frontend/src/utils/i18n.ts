// Temporarily disabled for React 19 compatibility
// import { initReactI18next } from "react-i18next";
// import i18n from "i18next";
// import arabic from "@/languages/ar.json";
// import english from "@/languages/en.json";
// import french from "@/languages/fr.json";

// const resources = {
//   en: {
//     translation: english,
//   },
//   fr: {
//     translation: french,
//   },
//   ar: {
//     translation: arabic,
//   },
// };

// i18n
//   .use(initReactI18next) // passes i18n down to react-i18next
//   .init({
//     resources,
//     lng: "en",
//     interpolation: {
//       escapeValue: false, // react already safes from xss
//     },
//   });

// Placeholder export for React 19 compatibility
export const i18n = {
  t: (key: string) => key, // Simple fallback
  language: "en",
};