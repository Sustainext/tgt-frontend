'use client';

import { useState, useEffect } from "react";
import axios from "axios";

const TranslationPanel = () => {
  const [language, setLanguage] = useState("en"); // Default language: Spanish
  const [translatedContent, setTranslatedContent] = useState({}); // Stores translations

  const fetchTranslations = async (textArray, targetLanguage) => {
    const translations = {};

    // Fetch translation for each text element
    for (const text of textArray) {
      try {
        const response = await axios.get(
          `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
            text
          )}&langpair=en|${targetLanguage}`
        );
        translations[text] = response.data.responseData.translatedText;
      } catch (error) {
        console.error("Error translating text:", error);
      }
    }

    return translations;
  };

  useEffect(() => {
    const translatePageContent = async () => {
      // Select all elements with the 'data-translate' attribute
      const elements = document.querySelectorAll("[data-translate]");
      const textArray = Array.from(elements).map((el) => el.textContent);

      // Fetch translations for all text
      const translations = await fetchTranslations(textArray, language);

      // Update page content with translations
      elements.forEach((el) => {
        el.textContent = translations[el.textContent] || el.textContent;
      });

      setTranslatedContent(translations);
    };

    translatePageContent();
  }, [language]);

  return (
    <div style={{ padding: "10px", textAlign: "center" }}>
      <h3>Select Language</h3>
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        style={{ padding: "8px", fontSize: "16px" }}
      >
           <option value="en">English</option>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
        <option value="de">German</option>
        <option value="ar">Arabic</option>
      </select>
    </div>
  );
};

export default TranslationPanel;
