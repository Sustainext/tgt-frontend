import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  updateScenarioActivity, 
  updateAllSelectedActivities,
  setActivityChange,
  setChangesInActivity,
  updateActivityProperties
} from '../../../lib/redux/features/optimiseSlice';

/**
 * Custom hook for working with activity changes
 * @returns {Object} Functions and state for managing activity changes
 */
const useActivityChanges = () => {
  const dispatch = useDispatch();
  
  // Get activities from Redux store
  const activities = useSelector(state => state.optimise?.selectedActivities || []);
  const loading = useSelector(state => state.optimise?.loading || false);
  const error = useSelector(state => state.optimise?.error || null);
  
  /**
   * Get an activity by ID
   * @param {string} activityId - ID of the activity to find
   * @returns {Object|null} The activity object if found, null otherwise
   */
  const getActivity = useCallback(
    (activityId) => {
      if (!activities || !Array.isArray(activities)) return null;
      
      return activities.find(activity => {
        const id = activity.activity_id || activity.id || activity.uuid;
        return id === activityId;
      }) || null;
    },
    [activities]
  );
  
  /**
   * Update an activity's activity_change property
   * @param {string} activityId - ID of the activity to update
   * @param {Object|boolean} activityChange - New activity_change value
   * @param {boolean} saveToAPI - Whether to save to the API
   * @param {string} scenarioId - ID of the scenario (required if saveToAPI is true)
   * @returns {Promise} Promise that resolves when the update is complete
   */
  const updateActivityChange = useCallback(
    (activityId, activityChange, saveToAPI = false, scenarioId = null) => {
      // Dispatch action to update the activity_change in the Redux store
      dispatch(setActivityChange({ activityId, activityChange }));
      
      // Save to API if requested
      if (saveToAPI && scenarioId) {
        return dispatch(
          updateScenarioActivity({
            scenarioId,
            activityId,
            updates: { activity_change: activityChange }
          })
        );
      }
      
      return Promise.resolve();
    },
    [dispatch]
  );
  
  /**
   * Update an activity's changes_in_activity property
   * @param {string} activityId - ID of the activity to update
   * @param {Object} changesInActivity - New changes_in_activity value
   * @param {boolean} saveToAPI - Whether to save to the API
   * @param {string} scenarioId - ID of the scenario (required if saveToAPI is true)
   * @returns {Promise} Promise that resolves when the update is complete
   */
  const updateChangesInActivity = useCallback(
    (activityId, changesInActivity, saveToAPI = false, scenarioId = null) => {
      // Dispatch action to update the changes_in_activity in the Redux store
      dispatch(setChangesInActivity({ activityId, changesInActivity }));
      
      // Save to API if requested
      if (saveToAPI && scenarioId) {
        return dispatch(
          updateScenarioActivity({
            scenarioId,
            activityId,
            updates: { changes_in_activity: changesInActivity }
          })
        );
      }
      
      return Promise.resolve();
    },
    [dispatch]
  );
  
  /**
   * Update multiple properties of an activity at once
   * @param {string} activityId - ID of the activity to update
   * @param {Object} properties - Object containing the properties to update
   * @param {boolean} saveToAPI - Whether to save to the API
   * @param {string} scenarioId - ID of the scenario (required if saveToAPI is true)
   * @returns {Promise} Promise that resolves when the update is complete
   */
  const updateActivity = useCallback(
    (activityId, properties, saveToAPI = false, scenarioId = null) => {
      // Dispatch action to update multiple properties in the Redux store
      dispatch(updateActivityProperties({ activityId, properties }));
      
      // Save to API if requested
      if (saveToAPI && scenarioId) {
        return dispatch(
          updateScenarioActivity({
            scenarioId,
            activityId,
            updates: properties
          })
        );
      }
      
      return Promise.resolve();
    },
    [dispatch]
  );
  
  /**
   * Handle changes from the ActivitiesGraph component
   * @param {string} activityId - ID of the activity being changed
   * @param {Object} changes - Changes object containing activity_change and changes_in_activity
   * @param {boolean} saveToAPI - Whether to save to the API
   * @param {string} scenarioId - ID of the scenario (required if saveToAPI is true)
   * @returns {Promise} Promise that resolves when the update is complete
   */
  const handleActivityGraphChange = useCallback(
    (activityId, changes, saveToAPI = false, scenarioId = null) => {
      // Use the updateActivity function to update all properties at once
      return updateActivity(activityId, changes, saveToAPI, scenarioId);
    },
    [updateActivity]
  );

  /**
   * Batch update all activities at once
   * @param {Array} activities - Array of activities to update
   * @param {string} scenarioId - ID of the scenario
   * @returns {Promise} Promise that resolves when all updates are complete
   */
  const batchUpdateAllActivities = useCallback(
    async (activities, scenarioId) => {
      if (!scenarioId || !Array.isArray(activities) || activities.length === 0) {
        console.warn('No activities to update or missing scenarioId');
        return Promise.resolve([]);
      }

      try {
        // Use the updateAllSelectedActivities thunk to update all activities in a single API call
        return await dispatch(
          updateAllSelectedActivities({
            scenarioId,
            activities
          })
        ).unwrap();
      } catch (error) {
        console.error('Failed to batch update activities:', error);
        throw error;
      }
    },
    [dispatch]
  );

  return {
    // State
    activities,
    loading,
    error,
    
    // Getters
    getActivity,
    
    // Update functions
    updateActivityChange,
    updateChangesInActivity,
    updateActivity,
    
    // Higher-level functions
    handleActivityGraphChange,
    batchUpdateAllActivities
  };
};

export default useActivityChanges;