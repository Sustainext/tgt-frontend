"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardHeader from "./dashobardheader";
import Sidenav from "./sidebar";
import { GlobalState } from "../../Context/page";
import StoreProvider from "../../Context/storeProvider";
import GlobalErrorHandler from "../shared/components/GlobalErrorHandler";
import MobileSidenav from "./mobilesidebar";

export default function DashboardLayout({ children }) {
  const { open } = GlobalState();
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size and update state
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024); // Change based on your breakpoint
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    // Function to load the Elfsight script
    const loadElfsightScript = () => {
      const existingScript = document.querySelector(
        'script[src="https://static.elfsight.com/platform/platform.js"]'
      );

      if (!existingScript) {
        const script = document.createElement("script");
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
      <StoreProvider>
        {isMobile ? (
          // **Mobile Version**
          <div className="block mx-4">
            <div className="fixed top-0 left-0 w-full z-50 h-16">
              <MobileSidenav />
            </div>
            <div className="flex-1 overflow-y-auto mt-36 overflow-x-hidden scrollable-content">{children}</div>
          </div>
        ) : (
          // **Desktop Version**
          <div className="xl:flex lg:flex md:hidden 2xl:flex w-full hidden">
            <div className="block float-left w-full xl:w-0 lg:w-0 2xl:w-0 md:-0">
              <Sidenav />
            </div>
            <div
              className={`mx-2 w-full ${
                open
                  ? "xl:ml-[243px] lg:ml-[243px] 2xl:ml-[243px] md:ml-[243px] sm:ml-[0px]"
                  : "xl:ml-[74px] 2xl:ml-[74px] lg:ml-[74px] md:ml-[74px] sm:ml-[0px]"
              }`}
            >
              <div className="mb-5">
                <DashboardHeader />
                  {/* Elfsight Widget */}
                  <div className="elfsight-widget mb-5">
                <div className="elfsight-app-1163c096-07de-4281-9338-996a26b6eec8" data-elfsight-app-lazy></div>
              </div>
                <div>{children}</div>
              </div>
            </div>
          </div>
        )}
      </StoreProvider>
    </section>
  );
}
