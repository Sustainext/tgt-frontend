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

// Initial state
const initialState = {
  currentScenario: null,
  metricsData: {}, // This will contain all metrics data including weightages
  selectedActivities: [],
  currentStep: 1,
  loading: {
    scenario: false,
    metrics: false,
    activities: false,
  },
  error: {
    scenario: null,
    metrics: null,
    activities: null,
  }
};

// Helper function to extract selected metrics from metrics data
const getSelectedMetrics = (metricsData) => {
  const selectedMetrics = {};
  
  // For each metric (fte, area, etc), check if it's enabled in the data
  Object.keys(metricsData).forEach(key => {
    // Only process direct metric keys (fte, area, etc), not fte_data or fte_weightage
    if (!key.includes('_')) {
      // Check if key is a valid business metric
      if (['fte', 'area', 'production_volume', 'revenue'].includes(key)) {
        selectedMetrics[key] = Boolean(metricsData[key]);
      }
    }
  });
  
  return selectedMetrics;
};

// Helper function to calculate equal weightages
const calculateEqualWeightages = (metricsData) => {
  // Get selected metrics from the metrics data
  const selectedMetrics = getSelectedMetrics(metricsData);
  const activeMetrics = Object.keys(selectedMetrics).filter(key => selectedMetrics[key]);
  const count = activeMetrics.length;
  
  if (count === 0) return {};
  
  const equalWeight = parseFloat((1 / count).toFixed(2));
  const weightages = {};
  
  activeMetrics.forEach(metric => {
    // Only valid business metrics should receive weightages
    if (['fte', 'area', 'production_volume', 'revenue'].includes(metric)) {
      weightages[metric] = equalWeight;
    }
  });
  
  return weightages;
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
      state.metricsData[metricId] = !state.metricsData[metricId];
      
      // Get selected metrics from updated metrics data
      const validMetricIds = ['fte', 'area', 'production_volume', 'revenue'];
      const activeMetricIds = validMetricIds.filter(key => state.metricsData[key]);
      const count = activeMetricIds.length;
      
      if (count > 0) {
        // Calculate equal weightage distribution
        const equalWeight = parseFloat((1 / count).toFixed(2));
        
        // Update the weightages in metricsData
        activeMetricIds.forEach(metric => {
          state.metricsData[`${metric}_weightage`] = equalWeight;
        });
      }
    },
    updateMetricData: (state, action) => {
      const { metricId, data } = action.payload;
      
      // Initialize metric data structure if it doesn't exist
      if (!state.metricsData[`${metricId}_data`]) {
        state.metricsData[`${metricId}_data`] = {};
      }
      
      // Update metric data with new values
      state.metricsData[`${metricId}_data`] = {
        ...state.metricsData[`${metricId}_data`],
        ...data
      };
    },
    setSelectedActivities: (state, action) => {
      state.selectedActivities = action.payload;
    },
    addSelectedActivity: (state, action) => {
      state.selectedActivities.push(action.payload);
    },
    removeSelectedActivity: (state, action) => {
      state.selectedActivities = state.selectedActivities.filter(
        activity => activity.id !== action.payload
      );
    },
    resetOptimiseState: () => initialState
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
        Object.keys(action.payload || {}).forEach(key => {
          state.metricsData[key] = action.payload[key];
        });
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
      });
  }
});

// Export actions and reducer
export const {
  setCurrentStep,
  toggleMetric,
  updateMetricData,
  setSelectedActivities,
  addSelectedActivity,
  removeSelectedActivity,
  resetOptimiseState
} = optimiseSlice.actions;

export default optimiseSlice.reducer;