import React, { createContext, useContext, useState } from 'react';

const EmissionsContext = createContext();

export const useEmissions = () => {
  return useContext(EmissionsContext);
};

export const EmissionsProvider = ({ children }) => {
  const [climatiqData, setClimatiqData] = useState({});
  const [scope1Data,setScope1Data] = useState([]);
  const [scope2Data,setScope2Data] = useState([]);
  const [scope3Data,setScope3Data] = useState([]);

  return (
    <EmissionsContext.Provider
      value={{ climatiqData, setClimatiqData,scope1Data,setScope1Data,scope2Data,setScope2Data,scope3Data,setScope3Data }}
    >
      {children}
    </EmissionsContext.Provider>
  );
};