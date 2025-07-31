'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardHeader from './dashobardheader';
import Sidenav from './sidebar';
import { GlobalState } from '../../Context/page';
import GlobalErrorHandler from '../shared/components/GlobalErrorHandler';
import MobileSidenav from './mobilesidebar';
// import { loadFromLocalStorage } from "../utils/storage";

export default function DashboardLayout({ children }) {
  const { open } = GlobalState();
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  //  const localUserDetails = loadFromLocalStorage("userData");

  // Detect screen size and update state
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024); // Change based on your breakpoint
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Function to load the Elfsight script
    const loadElfsightScript = () => {
      const existingScript = document.querySelector(
        'script[src="https://static.elfsight.com/platform/platform.js"]'
      );

      if (!existingScript) {
        const script = document.createElement('script');
        script.src = 'https://static.elfsight.com/platform/platform.js';
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
      observer.observe(document.documentElement, {
        childList: true,
        subtree: true,
      });
      return () => observer.disconnect();
    };

    return unsubscribe();
  }, []);

  return (
    <section>
      <GlobalErrorHandler />
      {isMobile ? (
        // **Mobile Version**
        <div className='h-full flex flex-col'>
          {/* Fixed Mobile Header */}
          <div className='fixed top-0 left-0 w-full z-50 h-16 bg-white shadow-sm'>
            <MobileSidenav />
          </div>

          {/* Fixed Elfsight Widget for Mobile */}
          <div className='fixed top-16 left-0 w-full z-40 bg-white'>
            <div className='elfsight-widget px-4 py-2'>
              <div
                className='elfsight-app-1163c096-07de-4281-9338-996a26b6eec8'
                data-elfsight-app-lazy
              ></div>
            </div>
          </div>

          {/* Scrollable Main Content */}
          <div className='flex-1 overflow-y-auto mt-32 px-4'>{children}</div>
        </div>
      ) : (
        // **Desktop Version**
        <div className='xl:flex lg:flex md:hidden 2xl:flex w-full h-full hidden'>
          {/* Fixed Sidebar */}
          <div className='sticky top-0 left-0 h-full z-40'>
            <div className='h-full overflow-y-auto'>
              <Sidenav />
            </div>
          </div>

          {/* Main Content Area */}
          <div
            className={`flex-1 h-full flex flex-col transition-all duration-300`}
          >
            {/* Fixed Header and Elfsight Widget */}
            <div className='flex-shrink-0'>
              <DashboardHeader />
              <div className='elfsight-widget mb-5 mx-2'>
                <div
                  className='elfsight-app-1163c096-07de-4281-9338-996a26b6eec8'
                  data-elfsight-app-lazy
                ></div>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className='flex-1 overflow-y-hidden mx-2 pr-6 mb-6'>
              {children}
            </div>

            {/* Scrollable Content */}
            <div className='flex-1 overflow-y-auto mx-2'>{children}</div>
          </div>
        </div>
      )}
    </section>
  );
}
