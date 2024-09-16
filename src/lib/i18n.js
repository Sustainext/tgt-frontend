import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import Fluentc from 'i18n-fluentc';
import LanguageDetector from 'i18next-browser-languagedetector'; // Import the language detector

// Initialize Fluentc backend
const fluentc = new Fluentc({
  environmentId: `5d6bdf0e-9c0f-4342-98fd-0b0576fb7af9`, // Replace with your FluentC environment ID
  apiKey: `da2-wtkl5bpofjbu5ex5iugu4o2mbm`, // If an API key is needed
});

// Initialize i18next with Fluentc and bind it to React
i18next
  .use(LanguageDetector)  // Use language detector plugin
  .use(fluentc)  // Use the Fluentc backend
  .use(initReactI18next)  // Bind i18next to React
  .init({
    fallbackLng: 'en',  // Default fallback language
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    debug: true,  // Enable debug mode to log errors
    detection: {
      // Language detection options (optional)
      order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
      caches: ['localStorage', 'cookie'],
    },
  }, (err) => {
    if (err) {
      console.error("i18next initialization error:", err);
    } else {
      console.log("i18next initialized successfully with auto-translation.");
    }
  });

export default i18next;
