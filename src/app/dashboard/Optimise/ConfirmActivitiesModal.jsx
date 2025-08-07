import React, { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import scenarioService from "./service/scenarioService";

const ConfirmActivitiesModal = ({
  isOpen,
  onClose,
  selectedActivities = [],
  onProceed,
  onGoBack,
  scenarioId
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  if (!selectedActivities.length) return null;

  // Handle submitting selected activities to the backend
  const handleConfirmActivities = async () => {
    if (!scenarioId) {
      // If no scenarioId, just proceed without API call
      onProceed();
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Format the activities array to match the expected API payload format
      // Using uuid for identification as per the updated requirements
      const formattedActivities = selectedActivities.map(activity => ({
        // Required fields for the API
        uuid: activity.uuid,
        activity_id: activity.activity_id || activity.id,
        activity_name: activity.activity_name || activity.activity,
        sub_category: activity.sub_category || activity.subCategory,
        factor_id: activity.factor_id || "",
        
        // Additional fields to maintain data integrity
        scope: activity.scope || "",
        category: activity.category || "",
        region: activity.region || "",
        quantity: activity.quantity || 0,
        quantity2: activity.quantity2 || null,
        unit: activity.unit || "",
        unit2: activity.unit2 || null,
        unit_type: activity.unit_type || "",
        co2e_total: activity.co2e_total || 0
      }));
      
      // Make a single POST call to /selectedactivity with the formatted activities array
      await scenarioService.submitSelectedActivities(scenarioId, formattedActivities);
      
      // Call the onProceed function to move to the next step
      onProceed();
    } catch (error) {
      console.error("Error confirming activities:", error);
      setError("Failed to save selected activities. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
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
              <Dialog.Panel className="w-full max-w-5xl max-h-[85vh] transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <Dialog.Title className="text-xl font-semibold text-gray-900">
                      Confirm Selected Activities
                    </Dialog.Title>
                    <p className="mt-1 text-sm text-gray-500">
                      Click 'Proceed' to confirm the selected activities for which changes are to be calculated.
                    </p>
                  </div>
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-500"
                    onClick={onClose}
                    disabled={isSubmitting}
                  >
                    <FiX className="h-5 w-5" />
                  </button>
                </div>

                {/* Selected Activities Summary */}
                <div className="bg-white rounded-lg border border-gray-200 mb-6 max-h-[500px]">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="font-medium">
                      Selected Activities: {selectedActivities.length}
                    </h3>
                  </div>

                  <div className="overflow-hidden border-b border-gray-200 bg-white shadow sm:rounded-lg">
                    {/* Table Headers */}
                    <div className="grid grid-cols-7 gap-4 px-6 py-3 border-b border-gray-200 bg-gray-50 text-sm font-medium text-gray-500">
                      <div className="col-span-1">Scope</div>
                      <div className="col-span-1">Category</div>
                      <div className="col-span-1">Sub Category</div>
                      <div className="col-span-3">Activity</div>
                      <div className="text-center col-span-1">
                        Activity Region
                      </div>
                    </div>

                    {/* Table Body */}
                    <div className="max-h-[400px] overflow-y-auto">
                      <div className="divide-y divide-gray-200 text-gray-600">
                        {selectedActivities.map((activity, index) => (
                          <div
                            key={activity.uuid || index}
                            className="grid grid-cols-7 gap-4 px-6 py-4 text-sm"
                          >
                            <div className="col-span-1">{activity.scope}</div>
                            <div className="col-span-1">
                              {activity.category}
                            </div>
                            <div className="col-span-1">
                              {activity.subCategory || activity.sub_category}
                            </div>
                            <div className="col-span-3">
                              {activity.activity || activity.activity_name}
                            </div>
                            <div className="text-center col-span-1">
                              {activity.region}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Show error message if API call fails */}
                {error && (
                  <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md">
                    {error}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-end gap-4 mt-8">
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    onClick={onGoBack}
                    disabled={isSubmitting}
                  >
                    <FiChevronLeft className="mr-2 h-4 w-4" />
                    Go Back
                  </button>
                  <button
                    type="button"
                    className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                      isSubmitting ? "bg-blue-400" : "bg-blue-500 hover:bg-blue-600"
                    }`}
                    onClick={handleConfirmActivities}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                        Processing...
                      </>
                    ) : (
                      <>
                        Proceed
                        <FiChevronRight className="ml-2 h-4 w-4" />
                      </>
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

export default ConfirmActivitiesModal;