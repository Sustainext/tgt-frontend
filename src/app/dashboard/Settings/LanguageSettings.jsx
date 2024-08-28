import React, { useEffect, useRef, useCallback } from "react";
import { useFluentC } from "../../../Context/fluentc";
import FluentCScript from "../../shared/FluentcScript";

const LanguageSettings = () => {
  //FluentcWidget Configuration

  const { isFluentCOpen, setIsFluentCOpen } = useFluentC();

  const widgetContainerRef = useRef(null);
  const hasLoadedWidget = useRef(false);

  const loadWidget = useCallback(() => {
    if (
      !hasLoadedWidget.current &&
      window.fluentcWidget &&
      widgetContainerRef.current
    ) {
      // Detect user's default language
      const userLanguage = navigator.language || navigator.userLanguage;
      console.log("User's default language:", userLanguage);
      const widget = new window.fluentcWidget({
        widgetID: "33d7c1ce-b762-41c9-8b89-1606844f8707",
        targetLanguage: userLanguage
      });
      widget.setupWidget(widgetContainerRef.current);
      hasLoadedWidget.current = true;
    }
  }, []);

  useEffect(() => {
    loadWidget();
  }, [loadWidget]);

  useEffect(() => {
    setIsFluentCOpen(hasLoadedWidget.current);
  }, [loadWidget, setIsFluentCOpen]);
  return (
    <div className="flex justify-center items-center text-lg">
      {isFluentCOpen && (
        <label
          className="relative inline-flex items-center cursor-pointer text-gray-500"
          for="fluentc-widget"
        >
          Select Language :
        </label>
      )}
      <div className="ml-4">
        <div ref={widgetContainerRef} id="fluentc-widget" className="mr-4" />
      </div>
    </div>
  );
};

export default LanguageSettings;
