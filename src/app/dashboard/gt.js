import { useState, useEffect } from "react";
import axios from "axios";

export default function AutoTranslator() {
  const [targetLanguage, setTargetLanguage] = useState("en"); // Default language

  const subscriptionKey = "CqsX6nVaDfuwoOb64wSAAawm5zB0mN1RiHvMip0LBuCj1RBYwJvTJQQJ99ALACGhslBXJ3w3AAAbACOG70tV";
  const endpoint = "https://api.cognitive.microsofttranslator.com";
  const location = "centralindia"; // Replace with your resource's region

  // Cache for detected languages and translated text
  const languageCache = new Map();

  const detectLanguage = async (text) => {
    if (languageCache.has(text)) {
      return languageCache.get(text); // Return cached detected language
    }

    try {
      const response = await axios.post(
        `${endpoint}/detect?api-version=3.0`,
        [{ Text: text }],
        {
          headers: {
            "Ocp-Apim-Subscription-Key": subscriptionKey,
            "Ocp-Apim-Subscription-Region": location,
            "Content-Type": "application/json",
          },
        }
      );
      const detectedLanguage = response.data[0].language;
      languageCache.set(text, detectedLanguage); // Cache the detected language
      return detectedLanguage;
    } catch (error) {
      console.error("Error detecting language:", error);
      return null;
    }
  };

  const translateText = async (text, language) => {
    if (languageCache.has(`${text}-${language}`)) {
      return languageCache.get(`${text}-${language}`); // Return cached translation
    }

    try {
      const response = await axios.post(
        `${endpoint}/translate?api-version=3.0&to=${language}`,
        [{ Text: text }],
        {
          headers: {
            "Ocp-Apim-Subscription-Key": subscriptionKey,
            "Ocp-Apim-Subscription-Region": location,
            "Content-Type": "application/json",
          },
        }
      );
      const translatedText = response.data[0].translations[0].text;
      languageCache.set(`${text}-${language}`, translatedText); // Cache the translation
      return translatedText;
    } catch (error) {
      console.error("Error translating text:", error);
      return text; // Fallback to the original text
    }
  };

  const translateElement = async (element, language) => {
    if (element.childNodes.length === 0) return;

    for (let node of element.childNodes) {
      if (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim()) {
        const originalText = node.nodeValue.trim();
        try {
          const detectedLanguage = await detectLanguage(originalText);

          if (detectedLanguage === language) {
            // Skip translation if the text is already in the target language
            continue;
          }

          const translatedText = await translateText(originalText, language);
          node.nodeValue = translatedText; // Update text content with translation
        } catch (error) {
          console.error("Error processing node:", error);
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        // Recursively translate child elements
        await translateElement(node, language);
      }
    }
  };

  const translateWebpage = async (language) => {
    try {
      await translateElement(document.body, language); // Start translating from the body element
    } catch (error) {
      console.error("Error translating webpage:", error);
    }
  };

  useEffect(() => {
    // Translate the current page
    translateWebpage(targetLanguage);

    // Observe changes in the body for dynamic content or navigation changes
    const observer = new MutationObserver(() => {
      translateWebpage(targetLanguage); // Translate dynamically added content
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Cleanup the observer when the component is unmounted
    return () => observer.disconnect();
  }, [targetLanguage]);

  return (
    <div style={{ top: "10px", left: "10px", zIndex: 1000, background: "white", padding: "10px", border: "1px solid black" }}>
      <h1>Webpage Translator</h1>
      <select
        value={targetLanguage}
        onChange={(e) => setTargetLanguage(e.target.value)}
      >
        <option value="en">English</option>
        <option value="en-IN">Indian English</option>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
        <option value="de">German</option>
        <option value="zh-Hans">Simplified Chinese</option>
        <option value="ar">Arabic</option>
        <option value="ja">Japanese</option>
      </select>
    </div>
  );
}
