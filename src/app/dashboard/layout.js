'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation
import DashboardHeader from './dashobardheader';
import Sidenav from './sidebar';
import { GlobalState } from '../../Context/page';
import StoreProvider from '../../Context/storeProvider';
import GlobalErrorHandler from '../shared/components/GlobalErrorHandler';
import AutoTranslator from "./gt"
import TranslationPanel from "./testtrnslator"
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

  // useEffect(() => {
  //   const clearNetworkLogs = () => {
  //     console.clear();
  //     console.log('logs cleared');
  //   };

  //   const interval = setInterval(clearNetworkLogs, 5000);

  //   return () => clearInterval(interval); 
  // }, []);

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

 
//  useEffect(() => {
//     window.googleTranslateElementInit = () => {
//       if (!window.googleTranslateInitialized) {
//         new window.google.translate.TranslateElement(
//           {
//             pageLanguage: 'en',
//             includedLanguages: 'en,es,fr,de,ja',  // Supported languages
//             layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
//           },
//           'google_translate_element'
//         );
//         window.googleTranslateInitialized = true; // Prevent reinitialization
 
//         // Change the language names
//         const translateElement = document.querySelector('.goog-te-combo');
//         if (translateElement) {
//           const options = translateElement.options;
         
//           // Example of renaming the language names
//           for (let i = 0; i < options.length; i++) {
//             switch (options[i].value) {
//               case 'en':
//                 options[i].text = 'Cosmic English'; // Rename "English" to "Cosmic English"
//                 break;
//               case 'es':
//                 options[i].text = 'Cosmic Spanish'; // Rename "Spanish" to "Cosmic Spanish"
//                 break;
//               case 'fr':
//                 options[i].text = 'Cosmic French'; // Rename "French" to "Cosmic French"
//                 break;
//               // Add more cases as needed
//             }
//           }
//         }
//       }
//     };
 
//     if (!document.querySelector('#google-translate-script')) {
//       const script = document.createElement('script');
//       script.id = 'google-translate-script';
//       script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
//       script.async = true;
//       document.body.appendChild(script);
//     }
//   }, []);

  return (
    <>
      <section>
        <GlobalErrorHandler />
        <StoreProvider>
          <div className="flex w-full">
            <div className="block float-left">
              <Sidenav />
            </div>
            <div className={`mx-2 w-full ${open ? "ml-[243px]" : "ml-[74px]"}`}>
              <div className="mb-5">
                <DashboardHeader />
                {/* <TranslationPanel/> */}
            {/* <AutoTranslator/> */}
            {/* <div id="google_translate_element"></div> */}
                <div>{children}</div>
              </div>
            </div>
          </div>
        </StoreProvider>
      </section>
    </>
  );
}
