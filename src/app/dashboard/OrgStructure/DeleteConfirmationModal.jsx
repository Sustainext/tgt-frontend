import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  entityData,
  entityType,
  onConfirm,
}) => {
  if (!entityData) return null;

  const handleDelete = () => {
    // Call the parent's onConfirm handler
    onConfirm();
    onClose();
  };

  const renderEntityDetails = () => {
    switch (entityType) {
      case "organization":
        return (
          <div className="space-y-4">
            <div className="flex gap-4 items-center text-sm">
              <span className="text-gray-900 font-semibold">
                Organization Name
              </span>
              <span className="text-gray-600">{entityData.name}</span>
            </div>
            <div className="flex gap-4 items-center text-sm">
              <span className="text-gray-900 font-semibold">Sector</span>
              <span className="text-gray-600">
                {entityData.sector || "Default"}
              </span>
            </div>
            <div className="flex gap-4 items-center text-sm">
              <span className="text-gray-900 font-semibold">
                Location of Head quarters
              </span>
              <span className="text-gray-600">
                {entityData.location_of_headquarters || "Location"}
              </span>
            </div>
            <div className="flex gap-4 items-center text-sm">
              <span className="text-gray-900 font-semibold">
                Total Corporates Under
              </span>
              <span className="text-gray-600">
                {entityData.corporatenetityorg?.length || 0}
              </span>
            </div>
            <div className="flex gap-4 items-center text-sm">
              <span className="text-gray-900 font-semibold">
                Total Locations Under
              </span>
              <span className="text-gray-600">
                {entityData.corporatenetityorg?.reduce(
                  (total, corp) => total + (corp.location?.length || 0),
                  0
                ) || 0}
              </span>
            </div>
          </div>
        );
      case "corporate":
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-4 mb-4">
              <div>
                <div className="text-sm text-gray-900 font-semibold mb-1">
                  Organization
                </div>
                <div className="text-sm text-blue-600 bg-blue-100 px-1 py-1.5 rounded-md">
                  {entityData.organization}
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex gap-4 items-center text-sm">
                <span className="text-gray-900 font-semibold">
                  Sub Industry
                </span>
                <span className="text-gray-600">
                  {entityData.subindustry || "Default"}
                </span>
              </div>
              <div className="flex gap-4 items-center text-sm">
                <span className="text-gray-900 font-semibold">Country</span>
                <span className="text-gray-600">
                  {entityData.Country || "Default"}
                </span>
              </div>
              <div className="flex gap-4 items-center text-sm">
                <span className="text-gray-900 font-semibold">
                  Total Locations Under
                </span>
                <span className="text-gray-600">
                  {entityData.location?.length || 0}
                </span>
              </div>
            </div>
          </div>
        );
      case "location":
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-4 mb-4">
              <div>
                <div className="text-sm text-gray-900 font-semibold mb-1">
                  Organization
                </div>
                <div className="text-sm text-blue-600 font-bold bg-blue-100 px-1 py-1.5 rounded-md">
                  {entityData.organization}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-900 font-semibold mb-1">
                  Corporate Entity
                </div>
                <div className="text-sm text-green-600 bg-green-100 px-1 py-1.5 rounded-md">
                  {entityData.corporate}
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-start gap-4 items-center text-sm">
                <span className="text-gray-900 font-semibold">
                  Location Type
                </span>
                <span className="text-gray-600">
                  {entityData.location_type || "Default"}
                </span>
              </div>
              <div className="flex justify-start gap-4 items-center text-sm">
                <span className="text-gray-900 font-semibold">Address</span>
                <span className="text-gray-600">
                  {entityData.streetaddress || "Default"}
                </span>
              </div>
              <div className="flex justify-start gap-4 items-center text-sm">
                <span className="text-gray-900 font-semibold">City</span>
                <span className="text-gray-600">
                  {entityData.city || "Default"}
                </span>
              </div>
            </div>
          </div>
        );
      default:
        return null;
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                {/* Header */}
                <div className="flex items-center text-red-500 mb-4">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-6 h-6 mr-2"
                    fill="currentColor"
                  >
                    <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <Dialog.Title className="text-xl font-medium">
                    Delete{" "}
                    {entityType.charAt(0).toUpperCase() + entityType.slice(1)}
                  </Dialog.Title>
                </div>

                {/* Warning message */}
                <div className="mb-6">
                  <div className="text-red-600 text-sm font-medium mb-2">
                    Warning!
                  </div>
                  {entityType === "organization" ? (
                    <p className="text-gray-600 text-sm">
                      This process will delete the entire organization along
                      with the corporates and locations under them.{" "}
                    </p>
                  ) : entityType === "corporate" ? (
                    <p className="text-gray-600 text-sm">
                      This process will delete the corporate entity along with
                      all locations under it.{" "}
                    </p>
                  ) : (
                    <p className="text-gray-600 text-sm">
                      This process will delete this location{" "}
                      {/* <span className="line-through">
                        and it is irreversible.
                      </span> */}
                    </p>
                  )}
                </div>

                <hr className="text-gray-300 mt-6 mb-4" />

                {/* Entity details */}
                <div className="mb-6">{renderEntityDetails()}</div>

                <hr className="text-gray-300 my-6" />

                {/* Confirmation text */}
                <div className="text-gray-600 text-sm mb-6">
                  Are you sure you want to delete this{" "}
                  {entityType === "organization"
                    ? "entire organization"
                    : entityType}
                  ?
                </div>

                {/* Buttons */}
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="w-full py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Yes, Delete
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

export default DeleteConfirmationModal;
