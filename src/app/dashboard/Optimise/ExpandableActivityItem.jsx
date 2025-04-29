import React, { useState, useContext, useEffect } from 'react';
import { FiChevronDown, FiChevronUp, FiSave, FiCheck } from 'react-icons/fi';
import ActivitiesGraph from './ActivitiesGraph'; // Import the updated graph component
import { GlobalState } from "@/Context/page";
import scenarioService from './service/scenarioService'; // Import scenario service for potential API updates

const ExpandableActivityItem = ({ activity, scenarioId, onActivityUpdate }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { open, setOpen } = GlobalState();
  const [localActivity, setLocalActivity] = useState(activity);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  // Initialize activity with proper structure if needed fields are missing
  useEffect(() => {
    if (activity && !activity.percentage_change) {
      setLocalActivity({
        ...activity,
        activity_change: activity.activity_change || false,
        percentage_change: activity.percentage_change || {},
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
  const activityId = localActivity.activity_id || localActivity.id || '';
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
      activity_change: changes.activity_change,
      percentage_change: changes.percentage_change || {},
      changes_in_activity: changes.changes_in_activity || {}
    };

    // Update local state immediately for responsive UI
    setLocalActivity(updatedActivity);

    // If onActivityUpdate is provided, call it (for parent component state updates)
    if (onActivityUpdate) {
      onActivityUpdate(updatedActivity);
    }

    // If scenarioId is provided, update the activity via API
    if (scenarioId) {
      try {
        setIsSaving(true);
        setSaveSuccess(false);
        
        // Construct the payload for updating the scenario activity
        const payload = {
          activity_id: activityId,
          activity_change: changes.activity_change,
          percentage_change: changes.percentage_change || {},
          changes_in_activity: changes.changes_in_activity || {}
        };
        
        // Call the API to update the activity
        // This assumes a method exists in scenarioService for updating a specific activity
        // You might need to adapt this based on your actual API
        await scenarioService.updateScenarioActivity(scenarioId, uuid || activityId, payload);
        
        // Show success indicator briefly
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 2000);
      } catch (error) {
        console.error("Error updating activity:", error);
        // Optionally revert to previous state or show error message
      } finally {
        setIsSaving(false);
      }
    }
  };
  
  // Save changes manually if needed
  const handleSaveChanges = async () => {
    if (!scenarioId) return;
    
    try {
      setIsSaving(true);
      setSaveSuccess(false);
      
      // Construct the payload for the API
      const payload = {
        activity_id: activityId,
        activity_change: localActivity.activity_change,
        percentage_change: localActivity.percentage_change || {},
        changes_in_activity: localActivity.changes_in_activity || {}
      };
      
      // Call API to update the scenario activity
      await scenarioService.updateScenarioActivity(scenarioId, uuid || activityId, payload);
      
      // Show success indicator briefly
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
    } catch (error) {
      console.error("Error saving activity changes:", error);
    } finally {
      setIsSaving(false);
    }
  }

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
          <div className="grid grid-cols-2 gap-4 mb-4 text-sm ml-3">
            <div>
              <span className="text-gray-500">Activity ID:</span> {activityId}
            </div>
            <div>
              <span className="text-gray-500">Factor ID:</span> {factorId}
            </div>
            <div>
              <span className="text-gray-500">Quantity:</span> {quantity} {unit}
            </div>
            {/* <div>
              <span className="text-gray-500">Unit Type:</span> {unitType}
            </div> */}
            <div>
              <span className="text-gray-500">CO2e Total:</span> {Number(co2eTotal).toFixed(2)}
            </div>
          </div>
          
          {/* Activities graph for this activity */}
          <div className="min-h-80 p-2">
            <ActivitiesGraph
              activityName={activityName}
              baseYear={2025} 
              targetYear={2030}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpandableActivityItem;