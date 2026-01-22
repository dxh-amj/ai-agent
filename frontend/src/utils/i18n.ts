// Temporarily disabled i18n due to React 19 compatibility issues
// import { initReactI18next } from "react-i18next";
// import i18n from "i18next";

// Simple i18n mock for now
const i18n = {
  t: (key: string) => key, // Just return the key as translation
  changeLanguage: (lng: string) => Promise.resolve(),
  language: "en",
  languages: ["en", "fr", "ar"],
};

export { i18n };
