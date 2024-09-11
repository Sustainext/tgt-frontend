import { useEffect, useState } from 'react';

const useFluentCWidget = () => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.fluentcWidget && !isInitialized) {
      const initializeWidget = () => {
        const widgetContainer = document.getElementById('fluentc-widget');
        if (widgetContainer) {
          // Clear any existing content in the widget container
          widgetContainer.innerHTML = '';
          
          const f = new window.fluentcWidget({
            widgetID: "33d7c1ce-b762-41c9-8b89-1606844f8707",
          });
          f.setupWidget(widgetContainer);
          setIsInitialized(true);
        }
      };

      // Check if the DOM is already loaded
      if (document.readyState === 'complete') {
        initializeWidget();
      } else {
        // If not, wait for the DOM to be fully loaded
        window.addEventListener('load', initializeWidget);
        return () => window.removeEventListener('load', initializeWidget);
      }
    }
  }, [isInitialized]);

  return isInitialized;
};

export default useFluentCWidget;