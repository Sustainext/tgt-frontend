import axios from 'axios';

const LIBRETRANSLATE_URL = 'https://libretranslate.com/translate';

const extractTextFromDOM = () => {
  const textNodes = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);

  let node;
  while ((node = walker.nextNode())) {
    if (node.nodeValue.trim()) {
      textNodes.push(node);
    }
  }
  return textNodes;
};

const translateBatch = async (texts, targetLang) => {
  try {
    const response = await axios.post(
      LIBRETRANSLATE_URL,
      {
        q: texts,
        source: 'auto', // Auto-detect source language
        target: targetLang,
        format: 'text',
      },
      { headers: { 'Content-Type': 'application/json' } }
    );
    return response.data.translations || texts;
  } catch (error) {
    console.error('Batch translation error:', error);
    return texts; // Fallback to original texts
  }
};

export const translateWebpage = async (targetLang) => {
  const textNodes = extractTextFromDOM();

  const texts = textNodes.map((node) => node.nodeValue);
  const translatedTexts = await translateBatch(texts, targetLang);

  // Replace the text in the DOM
  textNodes.forEach((node, index) => {
    node.nodeValue = translatedTexts[index];
  });
};
