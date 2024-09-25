'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import i18next from "../../../lib/i18n"; // Ensure i18n is initialized correctly

const LanguageDetector = () => {
  const { t, ready } = useTranslation();  // Check if translations are ready with the `ready` flag
  const [isInitialized, setIsInitialized] = useState(false);  // Track if i18n is initialized

  // Effect to check if i18n is initialized
  useEffect(() => {
    if (i18next.isInitialized) {
      setIsInitialized(true);  // Set initialized state if i18n is ready
    } else {
      // Listen for i18n initialization event
      i18next.on('initialized', () => {
        console.log('i18n has been initialized');
        setIsInitialized(true);  // Set state to initialized when the event is triggered
      });
    }
  }, []);

  const changeLanguage = (lng) => {
    if (isInitialized) {
      i18next.changeLanguage(lng)
        .then(() => console.log(`Language changed to: ${lng}`))
        .catch(error => console.error('Error changing language:', error));
    } else {
      console.warn('i18n is not initialized yet.');
    }
  };

  // Wait until translations are ready
  if (!ready) {
    return <div>Loading translations...</div>;
  }

  return (
    <div className='ml-10'>
      {/* Using FluentC dashboard keys in the t() function */}
      <p>{t('consumed-fuel-and')}</p>
      <p>{t('scope-1')}</p> 
      <p>{t('welcomeMessage')}</p> 

      {/* Language switch buttons */}
      <button onClick={() => changeLanguage('en')}>English</button>
      <button onClick={() => changeLanguage('es')}>Español</button>
      <button onClick={() => changeLanguage('fr')}>Français</button>
      <button onClick={() => changeLanguage('ja')}>japan</button>
    </div>
  );
};

export default LanguageDetector;
