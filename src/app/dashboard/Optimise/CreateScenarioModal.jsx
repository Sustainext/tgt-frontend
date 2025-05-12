import React, { useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { FiX, FiChevronDown } from "react-icons/fi";
import { FaExclamationTriangle } from "react-icons/fa";
import { toast } from "react-toastify";
import axiosInstance from '@/app/utils/axiosMiddleware'
import scenarioService from './service/scenarioService';

const CreateScenarioModal = ({ isOpen, onClose, onCreateScenario }) => {
  // Form state
  const [scenarioName, setScenarioName] = useState("");
  const [selectionType, setSelectionType] = useState("Organization");
  const [selectedOrg, setSelectedOrg] = useState("");
  const [selectedCorp, setSelectedCorp] = useState("");
  const [baseYear, setBaseYear] = useState("2025");
  const [targetYear, setTargetYear] = useState("2030");
  
  // Validation state
  const [nameValidationError, setNameValidationError] = useState("");
  const [validationError, setValidationError] = useState("");
  const [dataAvailabilityError, setDataAvailabilityError] = useState("");
  
  // API data state
  const [organizations, setOrganizations] = useState([]);
  const [corporates, setCorporates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingCorporates, setIsFetchingCorporates] = useState(false);
  
  // Generate years from 2020 to 2040
  const years = Array.from({ length: 21 }, (_, i) => (2020 + i).toString());

  const validateForm = async () => {
    try {
      const dataExists = await scenarioService.checkEmissionDataExists(
        baseYear,
        selectedOrg,
        selectedCorp
      );
      
      if (!dataExists.exists) {
        // Show error message that data doesn't exist for this year/organization
        setDataAvailabilityError("Data not available for the selected year and organization");
        return false;
      }
      
      // Continue with form submission if data exists
      return true;
    } catch (error) {
      console.error('Error checking data availability:', error);
      setDataAvailabilityError("Error validating data availability");
      return false;
    }
  };

  // Fetch organizations when modal opens
  useEffect(() => {
    if (isOpen) {
      fetchOrganizations();
    }
  }, [isOpen]);

  // Fetch corporates when organization changes
  useEffect(() => {
    if (selectedOrg) {
      fetchCorporates(selectedOrg);
    } else {
      setCorporates([]);
    }
  }, [selectedOrg]);

  const fetchOrganizations = async () => {
    setIsLoading(true);
    try {
      // Use the new /orggetonly endpoint
      const response = await axiosInstance.get('/orggetonly');
      const orgs = response.data || [];
      
      // If data structure is an array of objects with id and name
      setOrganizations(Array.isArray(orgs) ? orgs : []);
    } catch (error) {
      console.error("Error fetching organizations:", error);
      toast.error("Failed to load organizations");
      
      // Fallback to sample data if API fails
      setOrganizations(["Org A", "Org B", "Org C", "Org D"]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCorporates = async (organizationId) => {
    if (!organizationId) return;
    
    setIsFetchingCorporates(true);
    try {
      // Use the corporate/ endpoint with organization_id parameter
      const response = await axiosInstance.get(`/corporate/?organization_id=${organizationId}`);
      const corps = response.data || [];
      
      // If data structure is an array of objects with id and name
      setCorporates(Array.isArray(corps) ? corps : []);
      
      // Reset selected corporate since organization changed
      setSelectedCorp("");
    } catch (error) {
      console.error("Error fetching corporates:", error);
      toast.error("Failed to load corporates for the selected organization");
      
      // Fallback to sample data if API fails
      setCorporates(["Corp A", "Corp B", "Corp C", "Corp D"]);
    } finally {
      setIsFetchingCorporates(false);
    }
  };

  // Validate years whenever they change
  useEffect(() => {
    // Compare years for validation
    if (parseInt(targetYear) <= parseInt(baseYear)) {
      setValidationError("The Target Year should be more than the base year");
    } else {
      setValidationError("");
    }

    // Simulate API check for data availability
    // In a real application, this would be an API call
    if (targetYear === "2023") {
      setDataAvailabilityError("Data not available for the selected year");
    } else {
      setDataAvailabilityError("");
    }
  }, [baseYear, targetYear]);

  // Handle form submission
  const handleProceed = async () => {
    // Reset validation errors
    setNameValidationError("");
    
    // Validate required fields
    if (!scenarioName) {
      setNameValidationError("Please enter a scenario name");
      return;
    }
  
    if (validationError) {
      return; // Don't proceed if there's a validation error
    }
  
    // Validate data availability with the API
    const isDataAvailable = await validateForm();
    if (!isDataAvailable) {
      return; // Don't proceed if data isn't available
    }
  
    // Create scenario data object
    const newScenario = {
      name: scenarioName,
      selectionType: selectionType,
      baseYear: baseYear,
      targetYear: targetYear,
      selectedOrg: selectedOrg,
      selectedCorp: selectedCorp,
    };
  
    try {
      setIsLoading(true);
      
      if (onCreateScenario) {
        await onCreateScenario(newScenario);
      }
      
      // Reset form and close modal
      resetForm();
      onClose();
      
    } catch (error) {
      console.error("Error creating scenario:", error);
      toast.error("Failed to create scenario. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setScenarioName("");
    setSelectionType("Organization");
    setSelectedOrg("");
    setSelectedCorp("");
    setBaseYear("2025");
    setTargetYear("2030");
    setValidationError("");
    setDataAvailabilityError("");
    setNameValidationError("");
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => {
          resetForm();
          onClose();
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-30" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                {/* Close button at top right */}
                <button
                  type="button"
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
                  onClick={() => {
                    resetForm();
                    onClose();
                  }}
                >
                  <FiX className="h-5 w-5" />
                </button>
                
                {/* Header */}
                <div className="mb-6">
                  <Dialog.Title className="text-xl font-medium text-gray-900">
                    Create a new Scenario
                  </Dialog.Title>
                  <p className="mt-1 text-sm text-gray-500">
                    Enter name for the scenario along with organization (corporate),
                    Base year and target year.
                  </p>
                </div>

                {/* Loading state */}
                {isLoading && (
                  <div className="flex justify-center items-center py-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                    <span className="ml-2 text-sm text-gray-600">Loading...</span>
                  </div>
                )}

                {/* Form Fields */}
                <div className="space-y-4">
                  {/* Scenario Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Enter Scenario Name
                    </label>
                    <input
                      type="text"
                      placeholder="Name"
                      className={`w-full h-10 rounded-md px-3 py-2 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:outline-none ${
                        nameValidationError ? "border-red-500" : ""
                      }`}
                      value={scenarioName}
                      onChange={(e) => setScenarioName(e.target.value)}
                      required
                    />
                    {
                      nameValidationError ? (
                        <p className="text-red-500 text-xs mt-1">{nameValidationError}</p>
                      ) : null
                    }
                  </div>

                  {/* Selection Type Tabs - Modified for darker selected background */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Select by
                    </label>
                    <div className="inline-flex rounded-md border border-gray-300 overflow-hidden">
                      <button
                        className={`px-4 py-2 text-sm font-medium ${
                          selectionType === "Organization"
                            ? "bg-slate-300 text-black" // Darker background for selected
                            : "bg-white text-gray-700 hover:bg-gray-50"
                        }`}
                        onClick={() => setSelectionType("Organization")}
                      >
                        Organization
                      </button>
                      <button
                        className={`px-4 py-2 text-sm font-medium ${
                          selectionType === "Corporate"
                            ? "bg-slate-300 text-black" // Darker background for selected
                            : "bg-white text-gray-700 hover:bg-gray-50"
                        }`}
                        onClick={() => setSelectionType("Corporate")}
                      >
                        Corporate
                      </button>
                    </div>
                  </div>

                  {/* Organization Selector */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Select Organization
                    </label>
                    <div className="relative">
                      <select
                        className="w-full h-10 appearance-none rounded-md pl-3 pr-10 py-2 border border-gray-300 bg-white focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                        value={selectedOrg}
                        onChange={(e) => setSelectedOrg(e.target.value)}
                        disabled={isLoading}
                      >
                        <option value="">Select an organization</option>
                        {organizations.map((org) => (
                          <option 
                            key={typeof org === 'object' ? org.id : org} 
                            value={typeof org === 'object' ? org.id : org}
                          >
                            {typeof org === 'object' ? org.name : org}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        <FiChevronDown className="h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                  </div>

                  {/* Corporate Selector */}
                  { selectionType === 'Corporate' && <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Select Corporate
                    </label>
                    <div className="relative">
                      <select
                        className="w-full h-10 appearance-none rounded-md pl-3 pr-10 py-2 border border-gray-300 bg-white focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                        value={selectedCorp}
                        onChange={(e) => setSelectedCorp(e.target.value)}
                        disabled={isFetchingCorporates || !selectedOrg}
                      >
                        <option value="">Select a corporate</option>
                        {corporates.map((corp) => (
                          <option 
                            key={typeof corp === 'object' ? corp.id : corp} 
                            value={typeof corp === 'object' ? corp.id : corp}
                          >
                            {typeof corp === 'object' ? corp.name : corp}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        {isFetchingCorporates ? (
                          <div className="animate-spin h-4 w-4 border-2 border-gray-300 border-t-gray-600 rounded-full" />
                        ) : (
                          <FiChevronDown className="h-4 w-4 text-gray-400" />
                        )}
                      </div>
                    </div>
                    {!selectedOrg && (
                      <p className="text-xs text-gray-500 mt-1">
                        Please select an organization first
                      </p>
                    )}
                  </div>}

                  {/* Year Selectors */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Select Base Year
                      </label>
                      <div className="relative">
                        <select
                          className="w-full h-10 appearance-none rounded-md pl-3 pr-10 py-2 border border-gray-300 bg-white focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                          value={baseYear}
                          onChange={(e) => setBaseYear(e.target.value)}
                        >
                          {years.map((year) => (
                            <option key={`base-${year}`} value={year}>
                              {year}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                          <FiChevronDown className="h-4 w-4 text-gray-400" />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Select Target Year
                      </label>
                      <div className="relative">
                        <select
                          className="w-full h-10 appearance-none rounded-md pl-3 pr-10 py-2 border border-gray-300 bg-white focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                          value={targetYear}
                          onChange={(e) => setTargetYear(e.target.value)}
                        >
                          {years.map((year) => (
                            <option key={`target-${year}`} value={year}>
                              {year}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                          <FiChevronDown className="h-4 w-4 text-gray-400" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Validation Error Messages */}
                  {validationError && (
                    <div className="flex items-center text-red-500 text-sm">
                      <FaExclamationTriangle className="mr-2" />
                      {validationError}
                    </div>
                  )}

                  {/* Data Availability Error Messages */}
                  {dataAvailabilityError && (
                    <div className="flex items-center text-red-500 text-sm">
                      <FaExclamationTriangle className="mr-2" />
                      {dataAvailabilityError}
                    </div>
                  )}
                </div>

                {/* Proceed Button */}
                <div className="mt-8 flex justify-end">
                  <button
                    type="button"
                    className={`inline-flex justify-center items-center rounded-md border border-transparent px-4 py-2 text-sm font-medium 
                      ${isLoading || validationError || !selectedOrg || selectionType === 'Corporate' && !selectedCorp ? 
                        'bg-blue-200 text-blue-400 cursor-not-allowed' : 
                        'bg-blue-500 text-white hover:bg-blue-600 focus:outline-none'}`}
                    onClick={handleProceed}
                    disabled={isLoading || validationError || !selectedOrg || selectionType === 'Corporate' && !selectedCorp}
                  >
                    {isLoading ? (
                      <>
                        <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                        Creating...
                      </>
                    ) : (
                      <>Proceed →</>
                    )}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CreateScenarioModal;