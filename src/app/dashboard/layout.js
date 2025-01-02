'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardHeader from './dashobardheader';
import Sidenav from './sidebar';
import { GlobalState } from '../../Context/page';
import StoreProvider from '../../Context/storeProvider';
import GlobalErrorHandler from '../shared/components/GlobalErrorHandler';
import LanguageSelector from './LanguageSelector';
export default function DashboardLayout({ children }) {
  const { open } = GlobalState();
  const router = useRouter();

  useEffect(() => {
    // Function to load the Elfsight script
    const loadElfsightScript = () => {
      const existingScript = document.querySelector(
        'script[src="https://static.elfsight.com/platform/platform.js"]'
      );

      if (!existingScript) {
        const script = document.createElement('script');
        script.src = "https://static.elfsight.com/platform/platform.js";
        script.async = true;
        document.body.appendChild(script);
      } else if (window.ElfsightPlatform) {
        // Reinitialize Elfsight if it's already loaded
        window.ElfsightPlatform.init();
      }
    };

    loadElfsightScript();

    // Observe URL changes for re-initializing the Elfsight script
    const handleRouteChange = () => {
      if (window.ElfsightPlatform) {
        window.ElfsightPlatform.init();
      }
    };

    // Listen for URL changes using the `useRouter`'s `push` method
    const unsubscribe = () => {
      const observer = new MutationObserver(handleRouteChange);
      observer.observe(document.documentElement, { childList: true, subtree: true });
      return () => observer.disconnect();
    };

    return unsubscribe();
  }, []);

  return (
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
              {/* <LanguageSelector/> */}
              {/* Elfsight Widget */}
              <div className="elfsight-widget mb-5">
                <div className="elfsight-app-1163c096-07de-4281-9338-996a26b6eec8" data-elfsight-app-lazy></div>
              </div>
              {/* Main Content */}
              <div>{children}</div>
            </div>
          </div>
        </div>
      </StoreProvider>
    </section>
  );
}
