import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ExpandableActivityItem from './ExpandableActivityItem';
import scenarioService from './service/scenarioService';
import { setSelectedActivities } from '../../../lib/redux/features/optimiseSlice';

const ActivitySummarySection = ({ activities = [], scenarioId }) => {
  const dispatch = useDispatch();
  // Track the redux loading state
  const reduxLoading = useSelector(state => state.optimise?.loading);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [displayActivities, setDisplayActivities] = useState([]);
  const [firstLoadComplete, setFirstLoadComplete] = useState(false);

  // Fetch activities from API if scenarioId is provided
  useEffect(() => {
    // Skip if we've already loaded activities and there's no scenario ID change
    if (firstLoadComplete && !scenarioId) return;

    const fetchActivities = async () => {
      if (!scenarioId) {
        // If no scenarioId provided, use the activities prop directly
        const processedActivities = activities.map(activity => ({
          ...activity,
          activity_change: activity.activity_change || false,
          percentage_change: activity.percentage_change || {},
          changes_in_activity: activity.changes_in_activity || {}
        }));
        
        setDisplayActivities(processedActivities);
        
        // Also update Redux store with these activities
        dispatch(setSelectedActivities(processedActivities));
        setFirstLoadComplete(true);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        // Fetch activities from the API
        const response = await scenarioService.fetchScenarioActivities(scenarioId);
        
        let activitiesData = [];
        
        // If the API returned an array, use it directly
        if (Array.isArray(response)) {
          activitiesData = response;
        } 
        // If the API returned an object with a 'results' property, use that
        else if (response && Array.isArray(response.results)) {
          activitiesData = response.results;
        } 
        // Otherwise, check if there's an 'activities' property
        else if (response && Array.isArray(response.activities)) {
          activitiesData = response.activities;
        }
        // If none of the above, fallback to the activities prop
        else {
          activitiesData = activities;
        }
        
        // Ensure all activities have the required structure
        const processedActivities = activitiesData.map(activity => ({
          ...activity,
          activity_change: activity.activity_change || false,
          percentage_change: activity.percentage_change || {},
          changes_in_activity: activity.changes_in_activity || {}
        }));
        
        // Update local state
        setDisplayActivities(processedActivities);
        
        // Also update Redux store with these activities
        dispatch(setSelectedActivities(processedActivities));
        
      } catch (error) {
        console.error("Error fetching scenario activities:", error);
        setError("Failed to load activities. Using local data instead.");
        
        // Fallback to the activities prop
        const fallbackActivities = activities.map(activity => ({
          ...activity,
          activity_change: activity.activity_change || false,
          percentage_change: activity.percentage_change || {},
          changes_in_activity: activity.changes_in_activity || {}
        }));
        
        setDisplayActivities(fallbackActivities);
        
        // Update Redux store with fallback activities
        dispatch(setSelectedActivities(fallbackActivities));
        
      } finally {
        setIsLoading(false);
        setFirstLoadComplete(true);
      }
    };

    fetchActivities();
  }, [scenarioId, dispatch]);

  // Handler for activity updates from child components
  const handleActivityUpdate = (updatedActivity) => {
    const activityId = updatedActivity.id || updatedActivity.activity_id || updatedActivity.uuid;
    
    if (!activityId) {
      console.error('Activity ID is missing');
      return;
    }
    
    // Update the activity in the local state
    setDisplayActivities(prev => 
      prev.map(activity => 
        (activity.id === activityId || 
         activity.activity_id === activityId || 
         activity.uuid === activityId) 
          ? updatedActivity 
          : activity
      )
    );
  };

  // Determine if we should show the loading state
  const showLoading = isLoading && (!firstLoadComplete || displayActivities.length === 0);

  return (
    <div className="space-y-6 table-scrollbar">
      {/* Title and Count */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">Selected Activities</h2>
        <div className="text-sm font-medium bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
          {displayActivities.length} activities
        </div>
      </div>

      {/* Loading state - only show if we're loading for the first time or have no activities */}
      {showLoading && (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
          <p className="text-gray-500">Loading activities...</p>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="bg-red-50 rounded-lg p-4 text-center text-red-600 mb-4">
          {error}
        </div>
      )}

      {/* Empty state - only show if we're not loading and have no activities */}
      {!showLoading && displayActivities.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <p className="text-gray-500">No activities have been selected</p>
        </div>
      ) : (
        !showLoading && (
          <div className="space-y-6">
            {displayActivities.map((activity, index) => (
              <ExpandableActivityItem 
                key={activity.id || activity.uuid || index}
                id={activity.id || activity.uuid || index} 
                activity={activity} 
                scenarioId={scenarioId}
                onActivityUpdate={handleActivityUpdate}
              />
            ))}
          </div>
        )
      )}

      {/* Loading overlay for subsequent loading (after first load) */}
      {isLoading && firstLoadComplete && displayActivities.length > 0 && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-20 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mr-3"></div>
              <p>Updating activities...</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivitySummarySection;