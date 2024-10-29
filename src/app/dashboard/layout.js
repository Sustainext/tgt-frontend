'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation
import DashboardHeader from './dashobardheader';
import Sidenav from './sidebar';
import { GlobalState } from '../../Context/page';
import StoreProvider from '../../Context/storeProvider';
import GlobalErrorHandler from '../shared/components/GlobalErrorHandler';

export default function DashboardLayout({ children }) {
  const { open } = GlobalState();
  const [defaultLanguage, setDefaultLanguage] = useState('ja');
  const router = useRouter(); // Initialize router

  useEffect(() => {
    // Redirect if token is not set in local storage
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/'); // Redirect to home page if no token
    }
  }, [router]); // Include router in the dependency array

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
      <section>
        <GlobalErrorHandler />
        <StoreProvider>
          <div className="flex w-full">
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
        </StoreProvider>
      </section>
    </>
  );
}
