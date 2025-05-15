// useActivityFilters.js
import { useState, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';

/**
 * Custom hook for managing filters based on activities data
 * This hook extracts unique values from activities for filter options
 * and handles filter state
 * 
 * @returns {Object} Filter state and methods
 */
const useActivityFilters = () => {
  // Fetch activities from Redux store
  const activities = useSelector(state => state.optimise?.selectedActivities || []);
  const loading = useSelector(state => state.optimise?.loading?.activities || false);
  
  // Filter options state
  const [scopeOptions, setScopeOptions] = useState(["Aggregated Scope"]);
  const [categoryOptions, setCategoryOptions] = useState(["Aggregated Scope"]);
  const [subCategoryOptions, setSubCategoryOptions] = useState(["Aggregated Scope"]);
  const [activityOptions, setActivityOptions] = useState(["Aggregated Scope"]);
  const [metrics, setMetrics] = useState([]);
  
  // Filter values state
  const [filters, setFilters] = useState({
    scope: ["Aggregated Scope"],
    category: ["Aggregated Scope"],
    subCategory: ["Aggregated Scope"],
    activity: ["Aggregated Scope"]
  });

  // Extract filter options from activities when they change
  useEffect(() => {
    if (!activities || !Array.isArray(activities) || activities.length === 0) return;
    
    // Create sets for unique values
    const scopes = new Set(["Aggregated Scope"]);
    const categories = new Set(["Aggregated Scope"]);
    const subCategories = new Set(["Aggregated Scope"]);
    const activityNames = new Set(["Aggregated Scope"]);
    const metricsSet = new Set();
    
    // Process each activity to extract unique values
    activities.forEach(activity => {
      // Add scope if it exists
      if (activity.scope) scopes.add(activity.scope);
      
      // Add category if it exists
      if (activity.category) categories.add(activity.category);
      
      // Add sub-category if it exists
      if (activity.sub_category) subCategories.add(activity.sub_category);
      
      // Add activity name if it exists
      if (activity.activity_name) activityNames.add(activity.activity_name);
      
      // Check for metrics
      const metricsFields = ['fte', 'area', 'production_volume', 'revenue', 'employees'];
      metricsFields.forEach(field => {
        if (activity[field] !== undefined) {
          metricsSet.add(field);
        }
      });
    });
    
    // Update state with unique values
    setScopeOptions(Array.from(scopes));
    setCategoryOptions(Array.from(categories));
    setSubCategoryOptions(Array.from(subCategories));
    setActivityOptions(Array.from(activityNames));
    
    // Create metrics array
    const metricsArray = [
      { id: "fte", name: "FTE", selected: metricsSet.has("fte") },
      { id: "area", name: "Area", selected: metricsSet.has("area") },
      { id: "production_volume", name: "Production Volume", selected: metricsSet.has("production_volume") },
      { id: "revenue", name: "Revenue", selected: metricsSet.has("revenue") },
      { id: "employees", name: "Employees", selected: metricsSet.has("employees") }
    ];
    setMetrics(metricsArray);
  }, [activities]);

  // Update filters based on selection
  const updateFilter = useCallback((filterType, value) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      
      // Create a consistent array value
      const arrayValue = Array.isArray(value) ? value : [value];
      
      // Handle parent-child filter relationships
      switch (filterType) {
        case 'scope':
          newFilters.scope = arrayValue;
          // If "Aggregated Scope" is selected, reset child filters
          if (arrayValue.includes("Aggregated Scope")) {
            newFilters.category = ["Aggregated Scope"];
            newFilters.subCategory = ["Aggregated Scope"];
            newFilters.activity = ["Aggregated Scope"];
          }
          break;
          
        case 'category':
          newFilters.category = arrayValue;
          // If "Aggregated Scope" is selected, reset child filters
          if (arrayValue.includes("Aggregated Scope")) {
            newFilters.subCategory = ["Aggregated Scope"];
            newFilters.activity = ["Aggregated Scope"];
          }
          break;
          
        case 'subCategory':
          newFilters.subCategory = arrayValue;
          // If "Aggregated Scope" is selected, reset activity filter
          if (arrayValue.includes("Aggregated Scope")) {
            newFilters.activity = ["Aggregated Scope"];
          }
          break;
          
        case 'activity':
          newFilters.activity = arrayValue;
          break;
          
        default:
          console.warn(`Unknown filter type: ${filterType}`);
      }
      
      return newFilters;
    });
  }, []);

  // Get filtered activities based on current filters
  const getFilteredActivities = useCallback(() => {
    if (!activities || !Array.isArray(activities)) return [];
    
    return activities.filter(activity => {
      // Check if activity matches all filters
      const matchesScope = 
        filters.scope.includes("Aggregated Scope") || 
        filters.scope.includes(activity.scope);
        
      const matchesCategory = 
        filters.category.includes("Aggregated Scope") || 
        filters.category.includes(activity.category);
        
      const matchesSubCategory = 
        filters.subCategory.includes("Aggregated Scope") || 
        filters.subCategory.includes(activity.sub_category);
        
      const matchesActivity = 
        filters.activity.includes("Aggregated Scope") || 
        filters.activity.includes(activity.activity_name);
      
      return matchesScope && matchesCategory && matchesSubCategory && matchesActivity;
    });
  }, [activities, filters]);

  // Reset filters to default
  const resetFilters = useCallback(() => {
    setFilters({
      scope: ["Aggregated Scope"],
      category: ["Aggregated Scope"],
      subCategory: ["Aggregated Scope"],
      activity: ["Aggregated Scope"]
    });
  }, []);

  // Update metrics selection
  const updateMetrics = useCallback((newMetrics) => {
    setMetrics(newMetrics);
  }, []);

  return {
    // Filter options
    scopeOptions,
    categoryOptions,
    subCategoryOptions,
    activityOptions,
    metrics,
    
    // Current filter values
    filters,
    
    // Methods
    updateFilter,
    resetFilters,
    getFilteredActivities,
    updateMetrics,
    
    // Loading state
    loading
  };
};

export default useActivityFilters;