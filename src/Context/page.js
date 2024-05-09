'use client'
import React, { createContext, useContext, useState } from 'react';

const GlobalStateContext = createContext({
  open: false,  // Default value adjusted for closed state
  setOpen: () => {}
});

export const GlobalState = () => useContext(GlobalStateContext);

export const GlobalStateProvider = ({ children }) => {
  const [open, setOpen] = useState(true);

  return (
    <GlobalStateContext.Provider value={{ open, setOpen }}>
      {children}
    </GlobalStateContext.Provider>
  );
};
