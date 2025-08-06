/**
 * Browser detection utilities
 */

export const detectBrowser = () => {
  if (typeof window === 'undefined') {
    return { isChromiumBased: true, browserName: 'unknown' };
  }

  const userAgent = navigator.userAgent;
  
  // Detect Chromium-based browsers
  const isChromiumBased = !!(window.chrome && (window.chrome.webstore || window.chrome.runtime)) ||
    /Chrome|Chromium|Edge|Opera/i.test(userAgent);

  // Detect specific browsers
  let browserName = 'unknown';
  if (/Safari/i.test(userAgent) && !/Chrome/i.test(userAgent)) {
    browserName = 'safari';
  } else if (/Firefox/i.test(userAgent)) {
    browserName = 'firefox';
  } else if (/Chrome/i.test(userAgent)) {
    browserName = 'chrome';
  } else if (/Edge/i.test(userAgent)) {
    browserName = 'edge';
  } else if (/Opera/i.test(userAgent)) {
    browserName = 'opera';
  }

  return {
    isChromiumBased,
    browserName,
    isSafari: browserName === 'safari',
    isFirefox: browserName === 'firefox',
    isChrome: browserName === 'chrome',
    isEdge: browserName === 'edge',
    isOpera: browserName === 'opera'
  };
};

export const getBrowserSpecificClasses = (isChromiumBased) => {
  return {
    // Height classes
    containerHeight: isChromiumBased ? 'min-h-[125vh]' : 'min-h-screen',
    gridHeight: isChromiumBased ? 'h-screen' : 'min-h-screen items-center',
    
    // Padding classes
    formPadding: isChromiumBased ? 'p-16' : 'p-8 md:p-16',
    logoContainer: isChromiumBased ? '' : 'p-8 self-start',
    
    // Margin classes
    formMargin: isChromiumBased ? 'my-20' : 'my-auto',
    formAlignment: isChromiumBased ? '' : 'self-center'
  };
};