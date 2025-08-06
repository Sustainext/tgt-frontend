'use client';
import React, { useEffect, useState } from 'react';
import { decryptPII, isDataEncrypted } from "../utils/fernetDecryption";

const EZGB = () => {
  const [scriptError, setScriptError] = useState(false);
  const [userEmail,setUserEmail]=useState(null)
   useEffect(() => {
    let email = localStorage.getItem('userEmail');
    if (email) {
      if (isDataEncrypted(email)) {
        email = decryptPII(email);
      }
      setUserEmail(email);
    } else {
      setUserEmail("");
    }
  }, []);

  useEffect(() => {
    if (!document.getElementById('cmdButtonScript')) {
      const script = document.createElement('script');
      script.id = 'cmdButtonScript';
      script.src = 'https://button.screamingpower.ca/guest/cmdButton.js';
      script.async = true;

      script.onload = () => {
        console.log('Script loaded successfully.');
      };

      script.onerror = () => {
        console.error('Failed to load cmdButton.js');
        setScriptError(true);
      };

      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="mx-5 my-5">
      {scriptError ? (
        <div className="p-4 border border-red-300 bg-red-50 text-red-700 rounded-md">
          ⚠️ Failed to load the utility connection script. Please try again later or contact support.
        </div>
      ) : (
        <div id="cmdButton" customerCode="fsq9ur" email={userEmail?userEmail:'dummy@gmail.com'}></div>
      )}
    </div>
  );
};

export default EZGB;
