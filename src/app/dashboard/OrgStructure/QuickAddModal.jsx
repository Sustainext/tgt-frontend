import React, { useState } from "react";

const QuickAddModal = ({
  isOpen,
  onClose,
  type,
  parentNode,
  isSibling,
  rawData,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    country: "",
    city: "",
  });

  if (!isOpen) return null;

  const getTitle = () => {
    const action = isSibling ? "Add" : "Add to";
    const entityType = type.charAt(0).toUpperCase() + type.slice(1);
    return isSibling
      ? `Quick Add ${entityType}`
      : `Quick Add ${entityType} to ${parentNode?.name}`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-[460px] p-6">
        <h2 className="text-xl font-medium mb-2">{getTitle()}</h2>
        <p className="text-gray-600 text-sm mb-6">
          Add {type} quickly with just the necessary details
        </p>

        {/* Parent Info (if adding child) */}
        {!isSibling && parentNode && (
          <div className="grid grid-cols-2 gap-4 mb-6">
            {type === "location" && (
              <>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Organization
                  </label>
                  <div className="px-3 py-2 bg-blue-50 text-blue-700 rounded">
                    {parentNode.organization || parentNode.name}
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Corporate Entity
                  </label>
                  <div className="px-3 py-2 bg-green-50 text-green-700 rounded">
                    {parentNode.name}
                  </div>
                </div>
              </>
            )}
            {type === "corporate" && (
              <div className="col-span-2">
                <label className="block text-sm text-gray-600 mb-1">
                  Organization
                </label>
                <div className="px-3 py-2 bg-blue-50 text-blue-700 rounded">
                  {parentNode.name}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Form Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              {type.charAt(0).toUpperCase() + type.slice(1)} Name
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          {type === "location" && (
            <>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Location Type
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Type"
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Country
                </label>
                <select
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.country}
                  onChange={(e) =>
                    setFormData({ ...formData, country: e.target.value })
                  }
                >
                  <option value="">Select Country</option>
                  {/* Add country options */}
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">City</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="City"
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                />
              </div>
            </>
          )}
        </div>

        <div className="text-blue-600 text-sm mt-4 cursor-pointer hover:underline">
          Add More Details
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border rounded hover:bg-gray-50"
          >
            Cancel
          </button>
          <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Add {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickAddModal;
