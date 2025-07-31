import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isChromiumBased: true,
  browserName: 'unknown',
  isSafari: false,
  isFirefox: false,
  isChrome: false,
  isEdge: false,
  isOpera: false,
  isDetected: false,
};

const browserSlice = createSlice({
  name: 'browser',
  initialState,
  reducers: {
    setBrowserInfo: (state, action) => {
      return {
        ...state,
        ...action.payload,
        isDetected: true,
      };
    },
    resetBrowserInfo: () => initialState,
  },
});

export const { setBrowserInfo, resetBrowserInfo } = browserSlice.actions;

// Selectors
export const selectBrowserInfo = (state) => state.browser;
export const selectIsChromiumBased = (state) => state.browser.isChromiumBased;
export const selectBrowserName = (state) => state.browser.browserName;
export const selectIsSafari = (state) => state.browser.isSafari;
export const selectIsDetected = (state) => state.browser.isDetected;

// Helper selector for browser-specific classes
export const selectBrowserClasses = (state) => {
  const { isChromiumBased } = state.browser;
  return {
    containerHeight: isChromiumBased ? 'min-h-[100vh]' : 'min-h-[125vh]',
    gridHeight: isChromiumBased ? 'h-screen' : 'min-h-screen',
    formPadding: isChromiumBased ? 'p-16' : 'p-8 md:p-16',
    logoContainer: isChromiumBased ? '' : 'p-8',
    formMargin: isChromiumBased ? 'my-20' : 'my-20',
  };
};

export default browserSlice.reducer;
