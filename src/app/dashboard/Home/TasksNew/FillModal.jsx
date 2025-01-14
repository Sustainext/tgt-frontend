import React from 'react';
import { FiX, FiUser, FiFile, FiChevronDown } from "react-icons/fi";
import Moment from "react-moment";
import ImageUpload from "../../../shared/components/ImageUpload";

const FillModal = ({
  isOpen,
  onClose,
  taskassigndata,
  selectedActivityName,
  selectedActivity,
  isActivityReceived,
  isActivityFetched,
  activitiesList,
  unitTypes,
  onActivityChange,
  onTaskDataChange,
  onFileUpload,
  onSubmit,
  isBeforeToday,
  validateDecimalPlaces
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-5 rounded-lg shadow-lg w-[395px] h-[650px] overflow-y-auto table-scrollbar">
        <div className="mb-5">
          <div className="flex justify-between">
            <h5 className="text-lg font-bold">My Task</h5>
            <FiX 
              className="cursor-pointer"
              onClick={onClose}
            />
          </div>
          <p className="text-[15px] font-bold">
            Collect &gt; Environment &gt; Emissions
          </p>
        </div>

        <div className="flex mb-4">
          <div className="w-4/5">
            <h5 className="text-sm text-gray-500 mb-1">Assigned by</h5>
            <div className="flex items-center">
              <FiUser />
              <div className="ml-2">
                <p className="text-sm">{taskassigndata.assign_by_user_name}</p>
                <p className="text-sm text-gray-500">{taskassigndata.assign_by_email}</p>
              </div>
            </div>
          </div>
          <div className="w-1/5">
            <h5 className="text-sm text-gray-500 mb-1">Due date</h5>
            <p className={`text-sm ${isBeforeToday(taskassigndata.deadline) ? "text-red-500" : "text-black"}`}>
              <Moment format="DD/MM/YYYY">{taskassigndata.deadline}</Moment>
            </p>
          </div>
        </div>

        <div className="border-b-2 border-gray-200 mb-4" />

        <div className="px-5 space-y-4 mb-4">
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-3">
              <h5 className="text-sm mb-1">Location</h5>
              <p className="text-sm text-gray-500">{taskassigndata.location}</p>
            </div>
            <div>
              <h5 className="text-sm mb-1">Year</h5>
              <p className="text-sm text-gray-500">{taskassigndata.year}</p>
            </div>
          </div>

          {["month", "scope", "category", "subcategory"].map((field) => (
            <div key={field}>
              <h5 className="text-sm mb-1 capitalize">{field}</h5>
              <p className="text-sm text-gray-500">{taskassigndata[field]}</p>
            </div>
          ))}

          {isActivityReceived && taskassigndata.status !== 4 && (
            <div>
              <h5 className="text-sm mb-1">Activity</h5>
              <p className="text-sm text-gray-500">{taskassigndata.activity}</p>
            </div>
          )}
        </div>

        <div className="border-b-2 border-gray-200 mb-4" />

        <div className="mb-4">
          <h5 className="text-sm mb-3">Data to be added:</h5>

          {(!isActivityReceived || taskassigndata.status === 4) && (
            <div className="mb-3">
              <h5 className="text-sm mb-1">Select Activity</h5>
              <div className="relative">
                <select
                  className="w-full border rounded-md py-2 pl-3 pr-10 text-sm"
                  value={selectedActivityName}
                  onChange={onActivityChange}
                >
                  <option value="">
                    {isActivityFetched
                      ? activitiesList.length === 0
                        ? "No relevant activities found"
                        : "Select Activity"
                      : "Select Activity"}
                  </option>
                  {activitiesList.map((activity) => (
                    <option
                      key={activity.id}
                      value={`${activity.name} - (${activity.source}) - ${activity.unit_type}`}
                    >
                      {`${activity.name} - (${activity.source}) - ${activity.unit_type}`}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {selectedActivity?.unit_type?.includes("Over") ? (
              <>
                <div>
                  <h5 className="text-sm mb-1">Quantity 1</h5>
                  <div className="relative">
                    <input
                      type="number"
                      className="w-full border rounded-md py-2 pl-3 pr-20 text-sm"
                      placeholder="Enter Value"
                      value={taskassigndata.value1}
                      onChange={(e) => {
                        const value = validateDecimalPlaces(e.target.value);
                        onTaskDataChange({ value1: value });
                      }}
                    />
                    <div className="absolute right-1 top-0.5">
                      <select
                        className={`cursor-pointer appearance-none px-2 py-1 rounded-md leading-tight outline-none ms-1 mt-1.5 font-bold text-xs bg-[#007EEF] text-white w-[60px]`}
                        value={taskassigndata.unit1}
                        onChange={(e) => onTaskDataChange({ unit1: e.target.value })}
                      >
                        <option className="text-xs">Unit</option>
                        {unitTypes
                          .filter(
                            (unit) => unit.unit_type === selectedActivity.unit_type
                          )
                          .map((unit) => {
                            const unitValues = Object.values(unit.units);
                            if (unitValues.length >= 2) {
                              const firstArray = unitValues[0];
                              return firstArray;
                            }
                            return [];
                          })
                          .flat()
                          .flat()
                          .map((unitName) => (
                            <option key={unitName} className="text-xs">
                              {unitName}
                            </option>
                          ))}
                      </select>
                      <span className="absolute right-2 top-4 ml-2 transform -translate-y-1/2 pointer-events-none text-white">
                        <FiChevronDown className="text-xs" />
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h5 className="text-sm mb-1">Quantity 2</h5>
                  <div className="relative">
                    <input
                      type="number"
                      className="w-full border rounded-md py-2 pl-3 pr-20 text-sm"
                      placeholder="Enter Value"
                      value={taskassigndata.value2}
                      onChange={(e) => {
                        const value = validateDecimalPlaces(e.target.value);
                        onTaskDataChange({ value2: value });
                      }}
                    />
                    <div className="absolute right-1 top-0.5">
                      <select
                        className={`cursor-pointer appearance-none px-2 py-1 rounded-md leading-tight outline-none ms-1 mt-1.5 font-bold text-xs bg-[#007EEF] text-white w-[60px]`}
                        value={taskassigndata.unit2}
                        onChange={(e) => onTaskDataChange({ unit2: e.target.value })}
                      >
                        <option className="text-xs">Unit</option>
                        {unitTypes
                          .filter(
                            (unit) => unit.unit_type === selectedActivity.unit_type
                          )
                          .map((unit) => {
                            const unitValues = Object.values(unit.units);
                            if (unitValues.length >= 2) {
                              const secondArray = unitValues[1];
                              return secondArray;
                            }
                            return [];
                          })
                          .flat()
                          .flat()
                          .map((unitName) => (
                            <option key={unitName} className="text-xs">
                              {unitName}
                            </option>
                          ))}
                      </select>
                      <span className="absolute right-2 top-4 ml-2 transform -translate-y-1/2 pointer-events-none text-white">
                        <FiChevronDown className="text-xs" />
                      </span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div>
                <h5 className="text-sm mb-1">Quantity</h5>
                <div className="relative">
                  <input
                    type="number"
                    className="w-full border rounded-md py-2 pl-3 pr-20 text-sm"
                    placeholder="Enter Value"
                    value={taskassigndata.value1}
                    onChange={(e) => {
                      const value = validateDecimalPlaces(e.target.value);
                      onTaskDataChange({ value1: value });
                    }}
                  />
                  <div className="absolute right-1 top-0.5">
                    <select
                      className={`cursor-pointer appearance-none px-2 py-1 rounded-md leading-tight outline-none ms-1 mt-1.5 font-bold text-xs bg-[#007EEF] text-white w-[60px]`}
                      value={taskassigndata.unit1}
                      onChange={(e) => onTaskDataChange({ unit1: e.target.value })}
                    >
                      <option className="text-xs">Unit</option>
                      {unitTypes
                        .filter(
                          (unit) => unit.unit_type === selectedActivity.unit_type
                        )
                        .reduce((acc, unit) => {
                          return [...acc, ...Object.values(unit.units).flat()];
                        }, [])
                        .map((unitName) => (
                          <option key={unitName} className="text-xs">
                            {unitName}
                          </option>
                        ))}
                    </select>
                    <span className="absolute right-2 top-4 ml-2 transform -translate-y-1/2 pointer-events-none text-white">
                      <FiChevronDown className="text-xs" />
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div>
            <h5 className="text-sm mb-3">Upload supporting documentation:</h5>
            <div className="relative text-black rounded-md flex items-center">
              {taskassigndata.file_data ? (
                <div className="flex items-center space-x-2 px-8 py-4 border border-gray-300 rounded-md w-full">
                  <FiFile className="text-green-600" size={20} />
                  <div>
                    <p className="text-sm text-blue-500 truncate w-64">
                      {taskassigndata.file_data.name}
                    </p>
                    <p className="text-xs text-gray-400">
                      {(taskassigndata.file_data.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                </div>
              ) : (
                <ImageUpload onFileSelect={onFileUpload} />
              )}
            </div>
          </div>
        </div>

        <button
          className="w-full bg-blue-500 text-white rounded-md py-2 font-medium hover:bg-blue-600 transition-colors"
          onClick={onSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default FillModal;