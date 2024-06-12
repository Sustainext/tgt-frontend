import React, { createContext, useContext, useState } from 'react';

const EmissionsContext = createContext();

export const useEmissions = () => {
  return useContext(EmissionsContext);
};

export const EmissionsProvider = ({ children }) => {
  const [climatiqData, setClimatiqData] = useState({});

  return (
    <EmissionsContext.Provider
      value={{ climatiqData, setClimatiqData }}
    >
      {children}
    </EmissionsContext.Provider>
  );
};