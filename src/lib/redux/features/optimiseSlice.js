import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import scenarioService from '@/app/dashboard/Optimise/service/scenarioService';

// Async thunks for API operations
export const fetchScenarioById = createAsyncThunk(
  'optimise/fetchScenarioById',
  async (scenarioId, { rejectWithValue }) => {
    try {
      const response = await scenarioService.fetchScenarioById(scenarioId);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchScenarioMetrics = createAsyncThunk(
  'optimise/fetchScenarioMetrics',
  async (scenarioId, { rejectWithValue }) => {
    try {
      const response = await scenarioService.fetchScenarioMetrics(scenarioId);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateScenarioMetrics = createAsyncThunk(
  'optimise/updateScenarioMetrics',
  async ({ scenarioId, payload }, { rejectWithValue }) => {
    try {
      const response = await scenarioService.updateScenarioMetrics(scenarioId, payload);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchScenarioActivities = createAsyncThunk(
  'optimise/fetchScenarioActivities',
  async (scenarioId, { rejectWithValue }) => {
    try {
      const response = await scenarioService.fetchScenarioActivities(scenarioId);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateScenarioActivities = createAsyncThunk(
  'optimise/updateScenarioActivities',
  async ({ scenarioId, activities }, { rejectWithValue }) => {
    try {
      const response = await scenarioService.updateScenarioActivities(scenarioId, activities);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// New thunk for fetching emission data
export const fetchEmissionData = createAsyncThunk(
  'optimise/fetchEmissionData',
  async ({ scenarioId, filters = {} }, { rejectWithValue }) => {
    try {
      const response = await scenarioService.fetchEmissionData(scenarioId, filters);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Thunk for adding activities to a scenario
export const addActivitiesToScenario = createAsyncThunk(
  'optimise/addActivitiesToScenario',
  async ({ scenarioId, activityIds }, { rejectWithValue }) => {
    try {
      const response = await scenarioService.addActivitiesToScenario(scenarioId, activityIds);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Thunk for removing an activity from a scenario
export const removeActivityFromScenario = createAsyncThunk(
  'optimise/removeActivityFromScenario',
  async ({ scenarioId, activityId }, { rejectWithValue }) => {
    try {
      const response = await scenarioService.removeActivityFromScenario(scenarioId, activityId);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Utility functions for working with activities
const findActivityById = (activities, activityId) => {
  if (!activities || !Array.isArray(activities)) return null;
  return activities.find(activity => {
    const id = activity.activity_id || activity.id || activity.uuid;
    return id === activityId;
  }) || null;
};

const getActivityIndexById = (activities, activityId) => {
  if (!activities || !Array.isArray(activities)) return -1;
  return activities.findIndex(activity => {
    const id = activity.activity_id || activity.id || activity.uuid;
    return id === activityId;
  });
};

// Async thunk for updating a specific activity within a scenario
export const updateScenarioActivity = createAsyncThunk(
  'optimise/updateScenarioActivity',
  async ({ scenarioId, activityId, updates }, { rejectWithValue }) => {
    try {
      const response = await scenarioService.updateScenarioActivity(scenarioId, activityId, updates);
      return { 
        activityId, 
        updates, 
        response 
      };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


// Initial state
const initialState = {
  currentScenario: null,
  metricsData: {}, // This will contain all metrics data including weightages
  selectedActivities: [],
  currentStep: 3,
  // Emission data state
  emissionData: {
    activities: [],
    count: 0,
    filters: {
      search: '',
      scopes: [],
      categories: [],
      subCategories: [],
      regions: []
    },
    sorting: {
      column: null,
      order: 'asc'
    },
    pagination: {
      currentPage: 1,
      itemsPerPage: 10
    }
  },
  loading: {
    scenario: false,
    metrics: false,
    activities: false,
    emissionData: false
  },
  error: {
    scenario: null,
    metrics: null,
    activities: null,
    emissionData: null
  }
};

// Helper function to extract selected metrics from metrics data
const getSelectedMetrics = (metricsData) => {
  const selectedMetrics = {
    fte: false,
    area: false,
    productionVolume: false,
    revenue: false
  };
  
  // For each metric check if it's enabled in the data
  Object.keys(metricsData).forEach(key => {
    // Only process direct metric keys (fte, area, etc), not fte_data or fte_weightage
    if (!key.includes('_')) {
      // Map from snake_case to camelCase if needed
      const metricKey = key === 'production_volume' ? 'productionVolume' : key;
      
      // Set the value if it's a valid business metric
      if (Object.keys(selectedMetrics).includes(metricKey)) {
        selectedMetrics[metricKey] = Boolean(metricsData[key]);
      }
    }
  });
  
  return selectedMetrics;
};

// Create the slice
const optimiseSlice = createSlice({
  name: 'optimise',
  initialState,
  reducers: {
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
    toggleMetric: (state, action) => {
      const metricId = action.payload;
      
      // Toggle the metric in metricsData
      const snakeCaseMetricId = metricId === 'productionVolume' ? 'production_volume' : metricId;
      state.metricsData[snakeCaseMetricId] = !state.metricsData[snakeCaseMetricId];
      
      // Calculate new equal weightage distribution
      const selectedMetrics = getSelectedMetrics(state.metricsData);
      const activeMetrics = Object.keys(selectedMetrics).filter(key => selectedMetrics[key]);
      const count = activeMetrics.length;
      
      if (count > 0) {
        // Calculate equal weightage
        const equalWeight = parseFloat((1 / count).toFixed(2));
        
        // Update weightages
        activeMetrics.forEach(metric => {
          const snakeMetric = metric === 'productionVolume' ? 'production_volume' : metric;
          state.metricsData[`${snakeMetric}_weightage`] = equalWeight;
        });
      }
    },
    setMetricWeightages: (state, action) => {
      const weightages = action.payload;
      
      // Update the weightages in metricsData
      Object.keys(weightages).forEach(metricId => {
        const snakeMetric = metricId === 'productionVolume' ? 'production_volume' : metricId;
        state.metricsData[`${snakeMetric}_weightage`] = weightages[metricId];
      });
    },
    updateMetricData: (state, action) => {
      const { metricId, data } = action.payload;
      const snakeMetric = metricId === 'productionVolume' ? 'production_volume' : metricId;
      
      // Initialize metric data structure if it doesn't exist
      if (!state.metricsData[`${snakeMetric}_data`]) {
        state.metricsData[`${snakeMetric}_data`] = {};
      }
      
      // Update metric data with new values
      state.metricsData[`${snakeMetric}_data`] = {
        ...state.metricsData[`${snakeMetric}_data`],
        ...data
      };
    },
    setSelectedActivities: (state, action) => {
      state.selectedActivities = action.payload;
    },
    setEmissionDataFilter: (state, action) => {
      const { filterType, value } = action.payload;
      state.emissionData.filters[filterType] = value;
      
      // Reset to first page when filters change
      state.emissionData.pagination.currentPage = 1;
    },
    clearEmissionDataFilters: (state) => {
      state.emissionData.filters = {
        search: '',
        scopes: [],
        categories: [],
        subCategories: [],
        regions: []
      };
    },
    setEmissionDataSorting: (state, action) => {
      const { column, order } = action.payload;
      state.emissionData.sorting = { column, order };
    },
    setEmissionDataPagination: (state, action) => {
      const { currentPage, itemsPerPage } = action.payload;
      
      if (currentPage !== undefined) {
        state.emissionData.pagination.currentPage = currentPage;
      }
      
      if (itemsPerPage !== undefined) {
        state.emissionData.pagination.itemsPerPage = itemsPerPage;
      }
    },
    resetOptimiseState: () => initialState,
    // Update activity_change for a specific activity
    setActivityChange: (state, action) => {
      const { activityId, activityChange } = action.payload;
      const activityIndex = getActivityIndexById(state.selectedActivities, activityId);
      
      if (activityIndex !== -1) {
        state.selectedActivities[activityIndex] = {
          ...state.selectedActivities[activityIndex],
          activity_change: activityChange
        };
      }
    },
    
    // Update changes_in_activity for a specific activity
    setChangesInActivity: (state, action) => {
      const { activityId, changesInActivity } = action.payload;
      const activityIndex = getActivityIndexById(state.selectedActivities, activityId);
      
      if (activityIndex !== -1) {
        state.selectedActivities[activityIndex] = {
          ...state.selectedActivities[activityIndex],
          changes_in_activity: changesInActivity
        };
      }
    },
    
    // Update multiple properties of a specific activity at once
    updateActivityProperties: (state, action) => {
      const { activityId, properties } = action.payload;
      const activityIndex = getActivityIndexById(state.selectedActivities, activityId);
      
      if (activityIndex !== -1) {
        state.selectedActivities[activityIndex] = {
          ...state.selectedActivities[activityIndex],
          ...properties
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch scenario by ID
      .addCase(fetchScenarioById.pending, (state) => {
        state.loading.scenario = true;
        state.error.scenario = null;
      })
      .addCase(fetchScenarioById.fulfilled, (state, action) => {
        state.loading.scenario = false;
        state.currentScenario = action.payload;
      })
      .addCase(fetchScenarioById.rejected, (state, action) => {
        state.loading.scenario = false;
        state.error.scenario = action.payload || 'Failed to fetch scenario';
      })
      
      // Fetch scenario metrics
      .addCase(fetchScenarioMetrics.pending, (state) => {
        state.loading.metrics = true;
        state.error.metrics = null;
      })
      .addCase(fetchScenarioMetrics.fulfilled, (state, action) => {
        state.loading.metrics = false;
        
        // Store all metrics data directly
        state.metricsData = action.payload || {};
      })
      .addCase(fetchScenarioMetrics.rejected, (state, action) => {
        state.loading.metrics = false;
        state.error.metrics = action.payload || 'Failed to fetch metrics data';
      })
      
      // Update scenario metrics
      .addCase(updateScenarioMetrics.pending, (state) => {
        state.loading.metrics = true;
        state.error.metrics = null;
      })
      .addCase(updateScenarioMetrics.fulfilled, (state, action) => {
        state.loading.metrics = false;
        
        // Update metricsData with the response data
        // state.metricsData = action.payload || state.metricsData;
      })
      .addCase(updateScenarioMetrics.rejected, (state, action) => {
        state.loading.metrics = false;
        state.error.metrics = action.payload || 'Failed to update metrics';
      })
      
      // Fetch scenario activities
      .addCase(fetchScenarioActivities.pending, (state) => {
        state.loading.activities = true;
        state.error.activities = null;
      })
      .addCase(fetchScenarioActivities.fulfilled, (state, action) => {
        state.loading.activities = false;
        state.selectedActivities = action.payload || [];
      })
      .addCase(fetchScenarioActivities.rejected, (state, action) => {
        state.loading.activities = false;
        state.error.activities = action.payload || 'Failed to fetch activities';
      })
      
      // Update scenario activities
      .addCase(updateScenarioActivities.pending, (state) => {
        state.loading.activities = true;
        state.error.activities = null;
      })
      .addCase(updateScenarioActivities.fulfilled, (state, action) => {
        state.loading.activities = false;
        state.selectedActivities = action.payload || [];
      })
      .addCase(updateScenarioActivities.rejected, (state, action) => {
        state.loading.activities = false;
        state.error.activities = action.payload || 'Failed to update activities';
      })
      
      // Fetch emission data
      .addCase(fetchEmissionData.pending, (state) => {
        state.loading.emissionData = true;
        state.error.emissionData = null;
      })
      .addCase(fetchEmissionData.fulfilled, (state, action) => {
        state.loading.emissionData = false;
        state.emissionData.activities = action.payload.results || [];
        state.emissionData.count = action.payload.count || 0;
      })
      .addCase(fetchEmissionData.rejected, (state, action) => {
        state.loading.emissionData = false;
        state.error.emissionData = action.payload || 'Failed to fetch emission data';
      })
      
      // Add activities to scenario
      .addCase(addActivitiesToScenario.pending, (state) => {
        state.loading.activities = true;
        state.error.activities = null;
      })
      .addCase(addActivitiesToScenario.fulfilled, (state, action) => {
        state.loading.activities = false;
        // Update selected activities with the new list from API
        state.selectedActivities = action.payload || state.selectedActivities;
      })
      .addCase(addActivitiesToScenario.rejected, (state, action) => {
        state.loading.activities = false;
        state.error.activities = action.payload || 'Failed to add activities to scenario';
      })
      
      // Remove activity from scenario
      .addCase(removeActivityFromScenario.pending, (state) => {
        state.loading.activities = true;
        state.error.activities = null;
      })
      .addCase(removeActivityFromScenario.fulfilled, (state, action) => {
        state.loading.activities = false;
        // Update selected activities with the new list from API
        state.selectedActivities = action.payload || state.selectedActivities;
      })
      .addCase(removeActivityFromScenario.rejected, (state, action) => {
        state.loading.activities = false;
        state.error.activities = action.payload || 'Failed to remove activity from scenario';
      })
      .addCase(updateScenarioActivity.pending, (state) => {
        state.loading.activities = true;
        state.error.activities = null;
      })
      .addCase(updateScenarioActivity.fulfilled, (state, action) => {
        state.loading.activities = false;
        
        // Extract data from the action
        const { activityId, updates } = action.payload;
        
        // Find and update the specific activity in the state
        const activityIndex = getActivityIndexById(state.selectedActivities, activityId);
        if (activityIndex !== -1) {
          state.selectedActivities[activityIndex] = {
            ...state.selectedActivities[activityIndex],
            ...updates
          };
        }
      })
      .addCase(updateScenarioActivity.rejected, (state, action) => {
        state.loading.activities = false;
        state.error.activities = action.payload || 'Failed to update activity';
      });
  }
});

// Export actions and reducer
export const {
  setCurrentStep,
  toggleMetric,
  setMetricWeightages,
  updateMetricData,
  setSelectedActivities,
  setEmissionDataFilter,
  clearEmissionDataFilters,
  setEmissionDataSorting,
  setEmissionDataPagination,
  resetOptimiseState,

  setActivityChange,
  setChangesInActivity,
  updateActivityProperties
} = optimiseSlice.actions;

export const selectActivities = state => state.optimise.selectedActivities || [];
export const selectLoading = state => state.optimise.loading;
export const selectInitialized = state => state.optimise.initialized;
export const selectError = state => state.optimise.error;

export default optimiseSlice.reducer;