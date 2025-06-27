import React, { useState, useContext, useEffect } from 'react';
import { FiChevronDown, FiChevronUp, FiSave, FiCheck } from 'react-icons/fi';
import { GlobalState } from "@/Context/page";
import useActivityChanges from '../../../lib/redux/customHooks/useActivityChanges';
import IntegratedActivitiesGraph from './ActivitiesGraph';
import { useSelector } from 'react-redux';

const ExpandableActivityItem = ({ activity, scenarioId, onActivityUpdate, id }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { open, setOpen } = GlobalState();
  const [localActivity, setLocalActivity] = useState(activity);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const currentScenario = useSelector(state=>state.optimise.currentScenario)
  
  // Get activity management functions from the hook
  const { handleActivityGraphChange } = useActivityChanges();
  
  // Initialize activity with proper structure if needed fields are missing
  useEffect(() => {
    if (activity) {
      // Ensure proper structure for all required fields
      setLocalActivity({
        ...activity,
        activity_change: activity.activity_change || false,
        percentage_change: activity.percentage_change || {}, // This will be { "2024": 5, "2025": -7, ... } when active
        changes_in_activity: activity.changes_in_activity || {}
      });
    }
  }, [activity]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Handle field mappings from API response structure
  const scope = localActivity.scope || '';
  const category = localActivity.category || '';
  const subCategory = localActivity.sub_category || localActivity.subCategory || '';
  const activityName = localActivity.activity_name || localActivity.activity || '';
  const region = localActivity.region || '';
  const uuid = localActivity.uuid || '';
  const activityId = localActivity.activity_id || localActivity.id || id || '';
  const factorId = localActivity.factor_id || '';
  
  // Additional fields that might be useful for further details
  const quantity = localActivity.quantity || 0;
  const unit = localActivity.unit || '';
  const co2eTotal = localActivity.co2e_total || 0;
  const unitType = localActivity.unit_type || '';

  // Handle activity changes from the graph component
  const handleActivityChange = async (changes) => {
    // Create a new updated activity object 
    const updatedActivity = {
      ...localActivity,
      activity_change: changes.activity_change, // This will be true or false
      percentage_change: changes.percentage_change, // This will be { "2024": 5, "2025": -7, ... } or false
      changes_in_activity: changes.changes_in_activity || {}
    };

    // Update local state immediately for responsive UI
    setLocalActivity(updatedActivity);

    // If onActivityUpdate is provided, call it (for parent component state updates)
    if (onActivityUpdate) {
      onActivityUpdate(updatedActivity);
    }

    // The Redux store update will be handled by the IntegratedActivitiesGraph component
    // directly through the useActivityChanges hook
  };
  
  // Save changes manually when the save button is clicked
  const handleSaveChanges = async () => {
    if (!scenarioId || !activityId) return;
    
    try {
      setIsSaving(true);
      setSaveSuccess(false);
      
      // Use the hook's function to save to API
      await handleActivityGraphChange(
        activityId,
        {
          activity_change: localActivity.activity_change,
          percentage_change: localActivity.percentage_change,
          changes_in_activity: localActivity.changes_in_activity || {}
        },
        true, // saveToAPI = true
        scenarioId
      );
      
      // Show success indicator briefly
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
    } catch (error) {
      console.error("Error saving activity changes:", error);
    } finally {
      setIsSaving(false);
    }
  };

  // Count the number of years with changes
  const activityChangeYearCount = localActivity?.percentage_change && typeof localActivity.percentage_change === 'object' ? 
    Object.keys(localActivity.percentage_change).length : 0;
  
  // Count the number of years with activity changes
  const changesInActivityYearCount = localActivity?.changes_in_activity ? 
    Object.keys(localActivity.changes_in_activity).length : 0;

  return (
    <div className={`border rounded-lg mb-4 overflow-hidden bg-white shadow-md text-slate-700 ${open ? "max-w-[105vw]": "max-w-[116vw]"}`}>
      {/* Header - Always visible */}
      <div 
        className="grid grid-cols-7 gap-4 p-4 cursor-pointer hover:bg-gray-50 relative"
        onClick={toggleExpand}
      >
        <div className='col-span-1'>
          <div className="text-xs text-gray-500">Scope</div>
          <div className="font-medium">{scope}</div>
        </div>
        <div className='col-span-1'>
          <div className="text-xs text-gray-500">Category</div>
          <div className="font-medium">{category}</div>
        </div>
        <div className='col-span-2'>
          <div className="text-xs text-gray-500">Subcategory</div>
          <div className="font-medium">{subCategory}</div>
        </div>
        <div className="col-span-2">
          <div className="text-xs text-gray-500">Activity</div>
          <div className="font-medium truncate pr-4" title={activityName}>{activityName}</div>
        </div>
        <div className="col-span-1 flex justify-between items-center">
          <div>
            <div className="text-xs text-gray-500">Region</div>
            <div className="font-medium">{region}</div>
          </div>
          <button className="text-gray-500 hover:text-gray-700">
            {isExpanded ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
          </button>
        </div>
      </div>

      {/* Expandable content */}
      {isExpanded && (
        <div className="p-4 border-t border-gray-200">
          {/* Additional activity details */}
          {/* <div className="grid grid-cols-2 gap-4 mb-4 text-sm ml-3">
            <div>
              <span className="text-gray-500">Activity ID:</span> {activityId}
            </div>
            <div>
              <span className="text-gray-500">Factor ID:</span> {factorId}
            </div>
            <div>
              <span className="text-gray-500">Quantity:</span> {quantity} {unit}
            </div>
            <div>
              <span className="text-gray-500">CO2e Total:</span> {Number(co2eTotal).toFixed(2)}
            </div>
          </div> */}
          
          {/* Activities graph for this activity */}
          <div className="min-h-80 p-2">
            <IntegratedActivitiesGraph
              activityName={activityName}
              activityId={activityId}
              factorId={factorId}
              baseYear={currentScenario.base_year}
              targetYear={currentScenario.target_year}
              activity={localActivity}
              scenarioId={scenarioId}
              onActivityChange={handleActivityChange}
              saveToAPI={false} // Don't save to API automatically on every change
            />
          </div>
          
          {/* Manual save button */}
          {/* <div className="flex justify-end mt-4">
            <button
              onClick={handleSaveChanges}
              disabled={isSaving}
              className={`flex items-center px-4 py-2 rounded-md text-white ${
                isSaving ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {saveSuccess ? (
                <>
                  <FiCheck className="mr-2" /> Saved
                </>
              ) : (
                <>
                  <FiSave className="mr-2" /> {isSaving ? "Saving..." : "Save Changes"}
                </>
              )}
            </button>
          </div> */}
        </div>
      )}
    </div>
  );
};

export default ExpandableActivityItem;