import React, {useState, useEffect} from "react";
import { FiX, FiUser, FiFile, FiXCircle } from "react-icons/fi";
import Moment from "react-moment";
import ImageUpload from "../../../shared/components/ImageUpload";
import {getLocationName} from "../../../utils/locationName";

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
  onFileDelete,
  onSubmit,
  isBeforeToday,
  validateDecimalPlaces,
}) => {
  const [locationName,setLocationName] = useState('')
  useEffect(() => {
      const fetchLocationName = async () => {
        if (taskassigndata?.location) {
          try {
            const name = await getLocationName(taskassigndata.location);
            console.log('name of location', name);
            
            setLocationName(name);
          } catch (error) {
            console.error("Error fetching location name:", error);
            setLocationName(taskassigndata.location);
          }
        }
      };
  
      fetchLocationName();
    }, [taskassigndata.location]);

    const removeFile = () =>{
      onTaskDataChange((prev)=>prev.file_data = {})
    }
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 top-10 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg shadow-lg w-[375px] h-[600px] overflow-y-auto table-scrollbar">
        <div className="mb-4">
          <div className="flex justify-between">
            <h5 className="text-base font-bold">My Task</h5>
            <FiX className="cursor-pointer" onClick={onClose} />
          </div>
          <p className="text-sm font-bold">
            Collect &gt; Environment &gt; Emissions
          </p>
        </div>

        <div className="flex mb-3">
          <div className="w-4/5">
            <h5 className="text-sm text-gray-500 mb-0.5">Assigned by</h5>
            <div className="flex items-center">
              <FiUser size={14} />
              <div className="ml-2">
                <p className="text-sm">{taskassigndata.assign_by_user_name}</p>
                <p className="text-sm text-gray-500">
                  {taskassigndata.assign_by_email}
                </p>
              </div>
            </div>
          </div>
          <div className="w-1/5">
            <h5 className="text-sm text-gray-500 mb-0.5">Due date</h5>
            <p
              className={`text-sm ${
                isBeforeToday(taskassigndata.deadline)
                  ? "text-red-500"
                  : "text-black"
              }`}
            >
              <Moment format="DD/MM/YYYY">{taskassigndata.deadline}</Moment>
            </p>
          </div>
        </div>

        <div className="border-b-2 border-gray-200 mb-3" />

        <div className="px-4 space-y-3 mb-3">
          <div className="grid grid-cols-4 gap-3">
            <div className="col-span-3">
              <h5 className="text-sm mb-0.5">Location</h5>
              <p className="text-sm text-gray-500">{locationName || "Loading..."}</p>
            </div>
            <div>
              <h5 className="text-sm mb-0.5">Year</h5>
              <p className="text-sm text-gray-500">{taskassigndata.year}</p>
            </div>
          </div>

          {["month", "scope", "category", "subcategory"].map((field) => (
            <div key={field}>
              <h5 className="text-sm mb-0.5 capitalize">{field}</h5>
              <p className="text-sm text-gray-500">{field ==='scope' ? "Scope " + taskassigndata[field] : taskassigndata[field]}</p>
            </div>
          ))}

          {isActivityReceived && taskassigndata.status !== 4 && (
            <div>
              <h5 className="text-sm mb-0.5">Activity</h5>
              <p className="text-sm text-gray-500">{taskassigndata.activity}</p>
            </div>
          )}
        </div>

        <div className="border-b-2 border-gray-200 mb-3" />

        <div className="mb-3">
          <h5 className="text-sm mb-2">Data to be added:</h5>

          {(!isActivityReceived || taskassigndata.status === 4) && (
            <div className="mb-2">
              <h5 className="text-sm mb-0.5">Select Activity</h5>
              <div className="relative">
                <select
                  className="w-full border rounded-md py-1.5 pl-2 pr-8 text-sm"
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
                      {activity.name} - ({activity.source}) - {activity.unit_type} -{" "}
                            {activity.region} - {activity.year}
                            {activity.source_lca_activity !== "unknown" &&
                              ` - ${activity.source_lca_activity}`}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {selectedActivity?.unit_type?.includes("Over") ? (
              <>
                <div>
                  <h5 className="text-sm mb-0.5">Quantity 1</h5>
                  <div className="relative">
                    <input
                      type="number"
                      className="w-full border rounded-md py-1.5 pl-2 pr-16 text-sm"
                      placeholder="Enter Value"
                      value={taskassigndata.value1}
                      onChange={(e) => {
                        const value = validateDecimalPlaces(e.target.value);
                        onTaskDataChange({ value1: value });
                      }}
                    />
                    <div className="absolute right-1 top-0.5">
                      <select
                        className="cursor-pointer appearance-none px-2 py-1 rounded-md leading-tight outline-none ms-1 mt-1 font-medium text-[12px] bg-[#007EEF] text-white w-[50px]"
                        value={taskassigndata.unit1}
                        onChange={(e) =>
                          onTaskDataChange({ unit1: e.target.value })
                        }
                      >
                        <option className="text-[12px]">Unit</option>
                        {unitTypes
                          .filter(
                            (unit) =>
                              unit.unit_type === selectedActivity.unit_type
                          )
                          .map((unit) => {
                            const unitValues = Object.values(unit.units);
                            if (unitValues.length >= 2) {
                              return unitValues[0];
                            }
                            return [];
                          })
                          .flat()
                          .flat()
                          .map((unitName) => (
                            <option key={unitName} className="text-[12px]">
                              {unitName}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <h5 className="text-sm mb-0.5">Quantity 2</h5>
                  <div className="relative">
                    <input
                      type="number"
                      className="w-full border rounded-md py-1.5 pl-2 pr-16 text-sm"
                      placeholder="Enter Value"
                      value={taskassigndata.value2}
                      onChange={(e) => {
                        const value = validateDecimalPlaces(e.target.value);
                        onTaskDataChange({ value2: value });
                      }}
                    />
                    <div className="absolute right-1 top-0.5">
                      <select
                        className="cursor-pointer appearance-none px-2 py-1 rounded-md leading-tight outline-none ms-1 mt-1 font-medium text-[12px] bg-[#007EEF] text-white w-[50px]"
                        value={taskassigndata.unit2}
                        onChange={(e) =>
                          onTaskDataChange({ unit2: e.target.value })
                        }
                      >
                        <option className="text-[12px]">Unit</option>
                        {unitTypes
                          .filter(
                            (unit) =>
                              unit.unit_type === selectedActivity.unit_type
                          )
                          .map((unit) => {
                            const unitValues = Object.values(unit.units);
                            if (unitValues.length >= 2) {
                              return unitValues[1];
                            }
                            return [];
                          })
                          .flat()
                          .flat()
                          .map((unitName) => (
                            <option key={unitName} className="text-[12px]">
                              {unitName}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div>
                <h5 className="text-sm mb-0.5">Quantity</h5>
                <div className="relative">
                  <input
                    type="number"
                    className="w-full border rounded-md py-1.5 pl-2 pr-16 text-sm"
                    placeholder="Enter Value"
                    value={taskassigndata.value1}
                    onChange={(e) => {
                      const value = validateDecimalPlaces(e.target.value);
                      onTaskDataChange({ value1: value });
                    }}
                  />
                  <div className="absolute right-1 top-0.5">
                    <select
                      className="cursor-pointer appearance-none px-2 py-1 rounded-md leading-tight outline-none ms-1 mt-1 font-medium text-[12px] bg-[#007EEF] text-white w-[50px]"
                      value={taskassigndata.unit1}
                      onChange={(e) =>
                        onTaskDataChange({ unit1: e.target.value })
                      }
                    >
                      <option className="text-[12px]">Unit</option>
                      {unitTypes
                        .filter(
                          (unit) =>
                            unit.unit_type === selectedActivity.unit_type
                        )
                        .reduce((acc, unit) => {
                          return [...acc, ...Object.values(unit.units).flat()];
                        }, [])
                        .map((unitName) => (
                          <option key={unitName} className="text-[10px]">
                            {unitName}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div>
            <h5 className="text-sm my-3">Upload supporting documentation:</h5>
            <div className="relative text-black rounded-md flex items-center">
              {taskassigndata.file_data?.url ? (
                <div className="flex items-center space-x-2 px-8 py-4 border border-gray-300 rounded-md w-full">
                <div className="flex items-center justify-between">
                              <div className="text-2xl">
                                <FiFile color="#28C1A2" size={24} />
                              </div>
                              <div className="ml-2">
                                <p className="text-[14px] truncate w-48">{taskassigndata.file_data.name}</p>
                                <p className="text-[12px] text-gray-400">
                                  {(taskassigndata.file_data.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                              </div>
                              <button
                              onClick={onFileDelete}
                              className="ml-auto p-2 rounded-full"
                            >
                              <FiXCircle size={24} color="#D64564" />
                            </button>
                            </div>
                </div>
              ) : (
                <ImageUpload onFileSelect={onFileUpload} />
              )}
            </div>
          </div>
        </div>

        <button
          className="w-full bg-blue-500 text-white rounded-md py-1.5 text-sm font-medium hover:bg-blue-600 transition-colors"
          onClick={onSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default FillModal;
