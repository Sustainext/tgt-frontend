'use client';
import { useState, useEffect } from 'react';
import DashboardHeader from './dashobardheader';
import Sidenav from './sidebar';
import { GlobalState } from '../../Context/page';

export default function DashboardLayout({ children }) {
  const { open } = GlobalState();
  const [defaultLanguage, setDefaultLanguage] = useState('ja'); 



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
  }, [defaultLanguage]); 

  return (
    <>
      <section className='min-h-[100vh]'>
        <div className="flex w-full min-h-[100vh]">
          <div className="block float-left">
            <Sidenav />
          </div>
          <div className={`mx-2 w-full ${open ? 'ml-[243px]' : 'ml-[74px]'}`}>
            <div className="mb-5">
              <DashboardHeader />
             
              <div>{children}</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}