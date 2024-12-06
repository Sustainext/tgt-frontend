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
  const [devToolsOpen, setDevToolsOpen] = useState(false);

  // DevTools detection logic
  useEffect(() => {
    const threshold = 160; // Adjust if necessary to detect smaller changes
    const detectDevTools = () => {
      const widthThreshold = window.outerWidth - window.innerWidth > threshold;
      const heightThreshold = window.outerHeight - window.innerHeight > threshold;

      if (widthThreshold || heightThreshold) {
        if (!devToolsOpen) {
          setDevToolsOpen(true);
          console.warn('DevTools is open!');
          // Optional: Log out user or redirect
          // router.push('/unauthorized'); // Redirect user if necessary
        }
      } else {
        if (devToolsOpen) {
          setDevToolsOpen(false);
          console.log('DevTools is closed.');
        }
      }
    };

    const interval = setInterval(detectDevTools, 1000); // Check every second

    return () => clearInterval(interval); // Clean up on unmount
  }, [devToolsOpen]);

  useEffect(() => {
    const clearNetworkLogs = () => {
      console.clear();
      console.log('logs cleared');
    };

    const interval = setInterval(clearNetworkLogs, 5000);

    return () => clearInterval(interval); 
  }, []);

  useEffect(() => {
    // Function to block right-click on images
    const disableRightClick = (event) => {
      if (event.target.tagName === 'IMG') {
        event.preventDefault();
      }
    };

    // Add event listener to the document
    document.addEventListener('contextmenu', disableRightClick);

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener('contextmenu', disableRightClick);
    };
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      if (e.target.tagName !== 'BUTTON' && e.target.tagName !== 'A') {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

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

  // DevTools detection logic
 

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
