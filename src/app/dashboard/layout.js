'use client';
import { useState, useEffect } from 'react';
import DashboardHeader from './dashobardheader';
import Sidenav from './sidebar';
import { GlobalState } from '../../Context/page';

export default function DashboardLayout({ children }) {
  const { open } = GlobalState();
  const [defaultLanguage, setDefaultLanguage] = useState('ja'); // Define state for default language

  // For example, you can change the default language dynamically here
  // setDefaultLanguage('en'); // Use this function to update the language

  useEffect(() => {
    if (!document.getElementById('gtranslate-script')) {
      window.gtranslateSettings = {
        default_language: 'en',
        native_language_names: true,
        languages: ['en', 'fr', 'ja', 'hi'],
        wrapper_selector: '.gtranslate_wrapper',
      };

      const script = document.createElement('script');
      script.src = 'https://cdn.gtranslate.net/widgets/latest/dropdown.js';
      script.defer = true;
      script.id = 'gtranslate-script';
      document.body.appendChild(script);
    }
  }, [defaultLanguage]); // This will trigger if the defaultLanguage changes

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
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
