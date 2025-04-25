import React, { useState, useEffect } from 'react';
import ExpandableActivityItem from './ExpandableActivityItem';
import scenarioService from './service/scenarioService';

const ActivitySummarySection = ({ activities = [], scenarioId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [displayActivities, setDisplayActivities] = useState(activities);

  // Fetch activities from API if scenarioId is provided
  // useEffect(() => {
  //   const fetchActivities = async () => {
  //     if (!scenarioId) {
  //       // If no scenarioId provided, use the activities prop directly
  //       setDisplayActivities(activities);
  //       return;
  //     }

  //     setIsLoading(true);
  //     setError(null);

  //     try {
  //       // Fetch activities from the API
  //       const response = await scenarioService.fetchScenarioActivities(scenarioId);
        
  //       // If the API returned an array, use it directly
  //       if (Array.isArray(response)) {
  //         setDisplayActivities(response);
  //       } 
  //       // If the API returned an object with a 'results' property, use that
  //       else if (response && Array.isArray(response.results)) {
  //         setDisplayActivities(response.results);
  //       } 
  //       // Otherwise, check if there's an 'activities' property
  //       else if (response && Array.isArray(response.activities)) {
  //         setDisplayActivities(response.activities);
  //       }
  //       // If none of the above, fallback to the activities prop
  //       else {
  //         setDisplayActivities(activities);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching scenario activities:", error);
  //       setError("Failed to load activities. Using local data instead.");
  //       // Fallback to the activities prop
  //       setDisplayActivities(activities);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchActivities();
  // }, [scenarioId, activities]);

  return (
    <div className="space-y-6 table-scrollbar">
      {/* Title and Count */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">Selected Activities</h2>
        <div className="text-sm font-medium bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
          {displayActivities.length} activities
        </div>
      </div>

      {/* Loading state */}
      {isLoading && (
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

      {/* Empty state */}
      {!isLoading && displayActivities.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <p className="text-gray-500">No activities have been selected</p>
        </div>
      ) : (
        <div className="space-y-6">
          {displayActivities.map((activity, index) => (
            <ExpandableActivityItem key={activity.id || index} activity={activity} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ActivitySummarySection;