// utils/frameworkChecker.js
import { useState, useEffect } from 'react';

/**
 * Check if TCFD framework is available in localStorage
 * @returns {boolean} - Returns true if TCFD is available, false otherwise
 */
export const isTCFDAvailable = () => {
  try {
    const frameworkData = localStorage.getItem('framework');
    
    if (!frameworkData) {
      return false;
    }

    const frameworks = JSON.parse(frameworkData);
    
    if (!Array.isArray(frameworks)) {
      return false;
    }

    // Check if any framework has "TCFD" in its name (case-insensitive)
    return frameworks.some(framework => 
      framework.name && 
      framework.name.toLowerCase().includes('tcfd')
    );
  } catch (error) {
    console.error('Error checking TCFD availability:', error);
    return false;
  }
};

/**
 * Get the TCFD framework object from localStorage
 * @returns {Object|null} - Returns the TCFD framework object or null if not found
 */
export const getTCFDFramework = () => {
  try {
    const frameworkData = localStorage.getItem('framework');
    
    if (!frameworkData) {
      return null;
    }

    const frameworks = JSON.parse(frameworkData);
    
    if (!Array.isArray(frameworks)) {
      return null;
    }

    // Find the TCFD framework object
    return frameworks.find(framework => 
      framework.name && 
      framework.name.toLowerCase().includes('tcfd')
    ) || null;
  } catch (error) {
    console.error('Error getting TCFD framework:', error);
    return null;
  }
};

/**
 * Get all available frameworks from localStorage
 * @returns {Array} - Returns array of framework objects or empty array
 */
export const getAllFrameworks = () => {
  try {
    const frameworkData = localStorage.getItem('framework');
    
    if (!frameworkData) {
      return [];
    }

    const frameworks = JSON.parse(frameworkData);
    
    return Array.isArray(frameworks) ? frameworks : [];
  } catch (error) {
    console.error('Error getting frameworks:', error);
    return [];
  }
};

/**
 * Check if a specific framework is available by name
 * @param {string} frameworkName - Name of the framework to check
 * @returns {boolean} - Returns true if framework is available, false otherwise
 */
export const isFrameworkAvailable = (frameworkName) => {
  try {
    const frameworkData = localStorage.getItem('framework');
    
    if (!frameworkData || !frameworkName) {
      return false;
    }

    const frameworks = JSON.parse(frameworkData);
    
    if (!Array.isArray(frameworks)) {
      return false;
    }

    // Check if any framework matches the given name (case-insensitive)
    return frameworks.some(framework => 
      framework.name && 
      framework.name.toLowerCase().includes(frameworkName.toLowerCase())
    );
  } catch (error) {
    console.error('Error checking framework availability:', error);
    return false;
  }
};

/**
 * React hook to check TCFD availability and get framework data
 * @returns {Object} - Returns object with availability status and framework data
 */
export const useTCFDFramework = () => {
  const [tcfdData, setTcfdData] = useState({
    isAvailable: false,
    framework: null,
    allFrameworks: []
  });

  useEffect(() => {
    const checkTCFD = () => {
      setTcfdData({
        isAvailable: isTCFDAvailable(),
        framework: getTCFDFramework(),
        allFrameworks: getAllFrameworks()
      });
    };

    // Check on mount
    checkTCFD();

    // Listen for localStorage changes
    const handleStorageChange = (e) => {
      if (e.key === 'framework') {
        checkTCFD();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return tcfdData;
};

// Example usage functions
export const frameworkUtils = {
  // Simple boolean check
  isTCFDEnabled: () => isTCFDAvailable(),
  
  // Get TCFD image URL
  getTCFDImage: () => {
    const tcfd = getTCFDFramework();
    return tcfd?.Image || null;
  },
  
  // Check multiple frameworks at once
  checkFrameworks: (frameworkNames) => {
    return frameworkNames.map(name => ({
      name,
      available: isFrameworkAvailable(name)
    }));
  },
  
  // Get framework by exact name match
  getFrameworkByName: (name) => {
    const frameworks = getAllFrameworks();
    return frameworks.find(f => f.name === name) || null;
  }
};