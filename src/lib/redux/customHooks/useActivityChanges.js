import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateScenarioActivity, updateAllSelectedActivities } from '../../../lib/redux/features/optimiseSlice';

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
   * Update an activity's field with a specific value
   * @param {string} activityId - ID of the activity to update
   * @param {string} fieldName - Name of the field to update
   * @param {any} fieldValue - New value for the field
   * @param {boolean} saveToAPI - Whether to save to the API
   * @param {string} scenarioId - ID of the scenario (required if saveToAPI is true)
   * @returns {Promise} Promise that resolves when the update is complete
   */
  const updateActivityField = useCallback(
    (activityId, fieldName, fieldValue, saveToAPI = false, scenarioId = null) => {
      // Create updates object with the specified field
      const updates = { [fieldName]: fieldValue };
      
      // Update the field in Redux store
      dispatch({
        type: 'optimise/updateActivityProperties',
        payload: { activityId, properties: updates }
      });
      
      // Save to API if requested
      if (saveToAPI && scenarioId) {
        return dispatch(
          updateScenarioActivity({
            scenarioId,
            activityId,
            updates
          })
        );
      }
      
      return Promise.resolve();
    },
    [dispatch]
  );
  
  /**
   * Update an activity's activity_change property specifically
   * (Maintained for backward compatibility and convenience)
   * @param {string} activityId - ID of the activity to update
   * @param {Object|boolean} activityChange - New activity_change value
   * @param {boolean} saveToAPI - Whether to save to the API
   * @param {string} scenarioId - ID of the scenario (required if saveToAPI is true)
   * @returns {Promise} Promise that resolves when the update is complete
   */
  const updateActivityChange = useCallback(
    (activityId, activityChange, saveToAPI = false, scenarioId = null) => {
      return updateActivityField(activityId, 'activity_change', activityChange, saveToAPI, scenarioId);
    },
    [updateActivityField]
  );
  
  /**
   * Update an activity's percentage_change property specifically
   * (Maintained for backward compatibility with older implementations)
   * @param {string} activityId - ID of the activity to update
   * @param {Object|boolean} percentageChange - New percentage_change value
   * @param {boolean} saveToAPI - Whether to save to the API
   * @param {string} scenarioId - ID of the scenario (required if saveToAPI is true)
   * @returns {Promise} Promise that resolves when the update is complete
   */
  const updatePercentageChange = useCallback(
    (activityId, percentageChange, saveToAPI = false, scenarioId = null) => {
      return updateActivityField(activityId, 'percentage_change', percentageChange, saveToAPI, scenarioId);
    },
    [updateActivityField]
  );
  
  /**
   * Update an activity's changes_in_activity property specifically
   * (Maintained for backward compatibility and convenience)
   * @param {string} activityId - ID of the activity to update
   * @param {Object} changesInActivity - New changes_in_activity value
   * @param {boolean} saveToAPI - Whether to save to the API
   * @param {string} scenarioId - ID of the scenario (required if saveToAPI is true)
   * @returns {Promise} Promise that resolves when the update is complete
   */
  const updateChangesInActivity = useCallback(
    (activityId, changesInActivity, saveToAPI = false, scenarioId = null) => {
      return updateActivityField(activityId, 'changes_in_activity', changesInActivity, saveToAPI, scenarioId);
    },
    [updateActivityField]
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
      dispatch({
        type: 'optimise/updateActivityProperties',
        payload: { activityId, properties }
      });
      
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
   * This function is flexible and handles whichever fields are present in the changes object
   * @param {string} activityId - ID of the activity being changed
   * @param {Object} changes - Changes object containing any activity properties to update
   * @param {boolean} saveToAPI - Whether to save to the API
   * @param {string} scenarioId - ID of the scenario (required if saveToAPI is true)
   * @returns {Promise} Promise that resolves when the update is complete
   */
  const handleActivityGraphChange = useCallback(
    (activityId, changes, saveToAPI = false, scenarioId = null) => {
      // Use the updateActivity function to update all properties at once
      // This will work with any fields in the changes object including:
      // - activity_change
      // - percentage_change 
      // - changes_in_activity
      // - Any other fields that might be required
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

  /**
   * Toggle any boolean field for an activity (not just activity_change)
   * @param {string} activityId - ID of the activity to toggle
   * @param {string} fieldName - Name of the field to toggle (e.g., 'activity_change')
   * @param {boolean} enabled - Whether the field should be enabled
   * @param {any} enabledValue - Value to use when enabled (default: empty object {})
   * @param {any} disabledValue - Value to use when disabled (default: false)
   * @param {boolean} saveToAPI - Whether to save to the API
   * @param {string} scenarioId - ID of the scenario (required if saveToAPI is true)
   * @returns {Promise} Promise that resolves when the update is complete
   */
  const toggleActivityField = useCallback(
    (
      activityId, 
      fieldName, 
      enabled, 
      enabledValue = {}, 
      disabledValue = false, 
      saveToAPI = false, 
      scenarioId = null
    ) => {
      // Get the current activity
      const activity = getActivity(activityId);
      
      if (!activity) {
        console.warn(`Activity with ID ${activityId} not found`);
        return Promise.resolve();
      }
      
      // Set the new value based on the enabled state
      const newValue = enabled ? enabledValue : disabledValue;
      
      // Update the field
      return updateActivityField(activityId, fieldName, newValue, saveToAPI, scenarioId);
    },
    [getActivity, updateActivityField]
  );

  /**
   * Toggle specifically the activity_change state for an activity
   * (Maintained for backward compatibility and convenience)
   * @param {string} activityId - ID of the activity to toggle
   * @param {boolean} enabled - Whether activity_change should be enabled
   * @param {boolean} saveToAPI - Whether to save to the API
   * @param {string} scenarioId - ID of the scenario (required if saveToAPI is true)
   * @returns {Promise} Promise that resolves when the update is complete
   */
  const toggleActivityChange = useCallback(
    (activityId, enabled, saveToAPI = false, scenarioId = null) => {
      return toggleActivityField(
        activityId, 
        'activity_change', 
        enabled, 
        {}, // Default enabled value: empty object to be populated later
        false, // Default disabled value: false
        saveToAPI, 
        scenarioId
      );
    },
    [toggleActivityField]
  );

  return {
    // State
    activities,
    loading,
    error,
    
    // Getters
    getActivity,
    
    // Generic update functions
    updateActivityField,
    updateActivity,
    
    // Specific field update functions
    updateActivityChange,
    updatePercentageChange,
    updateChangesInActivity,
    
    // Toggle functions
    toggleActivityField,
    toggleActivityChange,
    
    // Higher-level functions
    handleActivityGraphChange,
    batchUpdateAllActivities,
  };
};

export default useActivityChanges;