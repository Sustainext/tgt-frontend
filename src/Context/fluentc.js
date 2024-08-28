'use client'
import React, { createContext, useState, useContext } from 'react';

const FluentCContext = createContext();

export const FluentCProvider = ({ children }) => {
  const [isFluentCOpen, setIsFluentCOpen] = useState(false);

  return (
    <FluentCContext.Provider value={{ isFluentCOpen, setIsFluentCOpen }}>
      {children}
    </FluentCContext.Provider>
  );
};

export const useFluentC = () => useContext(FluentCContext);