'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';

export default function FluentCWidgetApp() {
  const [isWidgetLoaded, setIsWidgetLoaded] = useState(false);
  const hasLoadedScript = useRef(false); // Tracks if the script has been loaded

  // Function to load the external script dynamically
  const loadExternalScript = (src, onLoad) => {
    if (!hasLoadedScript.current) {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      // script.onload = onLoad;
      document.body.appendChild(script);
      hasLoadedScript.current = true; // Mark the script as loaded
    } 
  };

  // Function to remove the existing widget instance and reset the DOM
  const resetWidgetContainer = () => {
    const widgetContainer = document.getElementById('fluentc-widget');
    if (widgetContainer) {
      widgetContainer.innerHTML = ''; // Clear out any previous instances
    }
  };

  // Function to initialize the FluentC widget
  const initializeWidget = () => {
    if (typeof fluentcWidget !== 'undefined') {
      const widgetContainer = document.getElementById('fluentc-widget');

      // Ensure no previous instance is running
      if (widgetContainer && widgetContainer.children.length > 0) {
        console.log('Widget already initialized, resetting container...');
        resetWidgetContainer(); // Clear any previous widget instance
      }

      const f = new fluentcWidget({
        widgetID: '33d7c1ce-b762-41c9-8b89-1606844f8707', // Replace with your actual widget ID
        defaultLanguage: 'en', // Set default language (if supported)
      });
      f.setupWidget('fluentc-widget'); // Initialize the widget inside the container

      setIsWidgetLoaded(true); // Mark widget as loaded
    } else {
      console.error('fluentcWidget is not defined');
    }
  };

  const loadWidget = useCallback(() => {
    if (!isWidgetLoaded) {
      // Dynamically load FluentC widget script
      loadExternalScript('https://widget.fluentc.io/fluentcWidget.min.js', () => {
        initializeWidget(); // Initialize the widget after the script is loaded
      });
    }
  }, [isWidgetLoaded]);

  useEffect(() => {
    loadWidget();
  }, [loadWidget]);

  // Reset the widget manually (e.g., with a button click)
  const resetToDefaultLanguage = () => {
    initializeWidget(); // Reinitialize the widget to reset the language
  };

  return (
    <div className="App">
      <header className="App-header">
        <div id="fluentc-widget"></div>
   
        <button onClick={resetToDefaultLanguage}>Reset</button>
      </header>
    </div>
  );
}
