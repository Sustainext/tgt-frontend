'use client';

import { useEffect, useRef } from 'react';
import { useFluentC } from '../../Context/fluentc';

const FluentCScript = () => {
  const { setIsFluentCOpen } = useFluentC();
  const widgetInitialized = useRef(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.fluentcWidget && !widgetInitialized.current) {
      const widgetContainer = document.getElementById('fluentc-widget');
      if (widgetContainer) {
        // Clear any existing content in the widget container
        widgetContainer.innerHTML = '';
        
        const f = new window.fluentcWidget({
          widgetID: "33d7c1ce-b762-41c9-8b89-1606844f8707",
        });
        f.setupWidget(widgetContainer);
        setIsFluentCOpen(true);
        widgetInitialized.current = true;
      }
    }
  }, [setIsFluentCOpen]);

  return null;
};

export default FluentCScript;