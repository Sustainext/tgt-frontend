import React, { useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { FiX, FiChevronDown } from "react-icons/fi";
import { FaExclamationTriangle } from "react-icons/fa";

const CreateScenarioModal = ({ isOpen, onClose, onCreateScenario }) => {
  const [scenarioName, setScenarioName] = useState("");
  const [selectionType, setSelectionType] = useState("Organization");
  const [selectedOrg, setSelectedOrg] = useState("Org A");
  const [selectedCorp, setSelectedCorp] = useState("Corp A");
  const [baseYear, setBaseYear] = useState("2025");
  const [targetYear, setTargetYear] = useState("2030");
  const [nameValidationError, setNameValidationError] = useState("");
  const [validationError, setValidationError] = useState("");
  const [dataAvailabilityError, setDataAvailabilityError] = useState("");

  // Sample data
  const organizations = ["Org A", "Org B", "Org C", "Org D"];
  const corporates = ["Corp A", "Corp B", "Corp C", "Corp D"];
  const years = Array.from({ length: 21 }, (_, i) => (2020 + i).toString());

  // Validate years whenever they change
  useEffect(() => {
    // Compare years for validation
    if (parseInt(targetYear) <= parseInt(baseYear)) {
      setValidationError("The Target Year should be more than the base year");
    } else {
      setValidationError("");
    }

    // Simulate API check for data availability
    // In a real app, this would be an API call
    if (targetYear === "2023") {
      setDataAvailabilityError("Data not available for the selected year");
    } else {
      setDataAvailabilityError("");
    }
  }, [baseYear, targetYear]);

  const handleProceed = () => {
    if (!scenarioName) {
      // Validate required fields
      setNameValidationError("Please enter a scenario name");
      return;
    }

    if (validationError) {
      return; // Don't proceed if there's a validation error
    }

    // Create scenario data object
    const newScenario = {
      name: scenarioName,
      organization: selectedOrg,
      corporate: selectedCorp,
      baseYear: baseYear,
      targetYear: targetYear,
    };

    // Pass to parent component
    // onCreateScenario(newScenario);
    
    // Reset form and close modal
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setScenarioName("");
    setSelectionType("Organization");
    setSelectedOrg("Org A");
    setSelectedCorp("Corp A");
    setBaseYear("2025");
    setTargetYear("2030");
    setValidationError("");
    setDataAvailabilityError("");
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
                    />
                    {
                      nameValidationError ? (
                        <p className="text-red-500 text-xs mt-1">{nameValidationError}</p>
                      ) : null
                    }
                  </div>

                  {/* Selection Type Tabs */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Select by
                    </label>
                    <div className="inline-flex rounded-md border border-gray-300 overflow-hidden">
                      <button
                        className={`px-4 py-2 text-sm font-medium ${
                          selectionType === "Organization"
                            ? "bg-white text-gray-900"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-50"
                        }`}
                        onClick={() => setSelectionType("Organization")}
                      >
                        Organization
                      </button>
                      <button
                        className={`px-4 py-2 text-sm font-medium ${
                          selectionType === "Corporate"
                            ? "bg-white text-gray-900"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-50"
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
                      >
                        {organizations.map((org) => (
                          <option key={org} value={org}>
                            {org}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        <FiChevronDown className="h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                  </div>

                  {/* Corporate Selector */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Select Corporate
                    </label>
                    <div className="relative">
                      <select
                        className="w-full h-10 appearance-none rounded-md pl-3 pr-10 py-2 border border-gray-300 bg-white focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                        value={selectedCorp}
                        onChange={(e) => setSelectedCorp(e.target.value)}
                      >
                        {corporates.map((corp) => (
                          <option key={corp} value={corp}>
                            {corp}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        <FiChevronDown className="h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                  </div>

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
                    className="inline-flex justify-center items-center rounded-md border border-transparent bg-blue-200 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-300 focus:outline-none"
                    onClick={handleProceed}
                  >
                    Proceed →
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