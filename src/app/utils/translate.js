import { useEffect } from 'react';

const GoogleTranslate = () => {
  useEffect(() => {
    const initializeGoogleTranslate = () => {
      if (typeof window !== 'undefined' && window.google) {
        new window.google.translate.TranslateElement(
          { pageLanguage: 'en' },
          'google_translate_element'
        );
      }
    };

    // Load Google Translate script
    const loadGoogleTranslateScript = () => {
      if (!document.getElementById('google-translate-script')) {
        const script = document.createElement('script');
        script.id = 'google-translate-script';
        script.src =
          'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);

        // Attach the callback function to the window
        window.googleTranslateElementInit = initializeGoogleTranslate;
      }
    };

    loadGoogleTranslateScript();
  }, []);

  return <div id="google_translate_element"></div>;
};

export default GoogleTranslate;
