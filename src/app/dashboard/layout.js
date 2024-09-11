'use client';
import { useEffect } from 'react';
import DashboardHeader from './dashobardheader';
import Sidenav from './sidebar';
import { GlobalState } from '../../Context/page';

export default function DashboardLayout({ children }) {
  const { open } = GlobalState();

  useEffect(() => {
    // Ensure the script is not added multiple times
    if (!document.getElementById('gtranslate-script')) {
      // Add the GTranslate settings
      window.gtranslateSettings = {
        default_language: 'en',
        native_language_names: true,
        languages: ['en',  'fr', 'ja', 'hi'],  // The available languages
        wrapper_selector: '.gtranslate_wrapper',  // Class to insert the widget
      };

      // Dynamically load the GTranslate widget script only once
      const script = document.createElement('script');
      script.src = 'https://cdn.gtranslate.net/widgets/latest/dropdown.js';
      script.defer = true;
      script.id = 'gtranslate-script';  // Add an id to prevent duplicate loading
      document.body.appendChild(script);
    }
  }, []);

  return (
    <>
      <section>
        <div className="flex w-full">
          <div className="block float-left">
            <Sidenav />
          </div>
          <div className={`mx-2 w-full ${open ? 'ml-[243px]' : 'ml-[87px]'}`}>
            <div className="mb-5">
              
              <DashboardHeader />
              <div className="gtranslate_wrapper" style={{ margin: '2px 0' }}></div>
              <div>{children}</div>
              {/* GTranslate wrapper for the language dropdown */}
             
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
