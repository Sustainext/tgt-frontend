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
  selectedMetrics: {
    fte: false,
    area: false,
    productionVolume: false,
    revenue: false,
  },
  metricsWeightages: {},
  metricsData: {},
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

// Helper function to calculate equal weightages
const calculateEqualWeightages = (selectedMetrics) => {
  const activeMetrics = Object.keys(selectedMetrics).filter(key => selectedMetrics[key]);
  const count = activeMetrics.length;
  
  if (count === 0) return {};
  
  const equalWeight = parseFloat((1 / count).toFixed(2));
  const weightages = {};
  
  activeMetrics.forEach(metric => {
    weightages[metric] = equalWeight;
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
      
      // Toggle the boolean value of the metric
      state.selectedMetrics[metricId] = !state.selectedMetrics[metricId];
      
      // Update weightages when a metric is toggled
      const activeMetrics = Object.keys(state.selectedMetrics)
        .filter(key => state.selectedMetrics[key]);
      
      const count = activeMetrics.length;
      
      if (count > 0) {
        // Calculate equal weightage distribution
        const equalWeight = parseFloat((1 / count).toFixed(2));
        
        // Create new weightages object
        const newWeightages = {};
        activeMetrics.forEach(metric => {
          newWeightages[metric] = equalWeight;
        });
        
        // Update state
        state.metricsWeightages = newWeightages;
      } else {
        // If no metrics are selected, clear weightages
        state.metricsWeightages = {};
      }
    },
    setMetricWeightages: (state, action) => {
      state.metricsWeightages = action.payload;
    },
    updateMetricData: (state, action) => {
      const { metricId, data } = action.payload;
      if (!state.metricsData[metricId]) {
        state.metricsData[metricId] = {};
      }
      state.metricsData[metricId] = {
        ...state.metricsData[metricId],
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
        
        // Extract metrics data from API response
        const metricsData = {};
        const selectedMetrics = { ...initialState.selectedMetrics };
        const weightages = {};
        
        // Process each key in the API response
        Object.keys(action.payload).forEach(key => {
          // Handle main metric toggles (e.g., "fte", "area")
          if (key in selectedMetrics) {
            selectedMetrics[key] = Boolean(action.payload[key]);
          }
          // Handle metric data (e.g., "fte_data")
          else if (key.endsWith('_data')) {
            const metricId = key.replace('_data', '');
            metricsData[metricId] = action.payload[key] || {};
          }
          // Handle weightages (e.g., "fte_weightage")
          else if (key.endsWith('_weightage')) {
            const metricId = key.replace('_weightage', '');
            weightages[metricId] = action.payload[key];
          }
        });
        
        // Update state with extracted data
        state.selectedMetrics = selectedMetrics;
        state.metricsData = metricsData;
        
        // If weightages were provided in the response, use them; otherwise calculate equal weights
        if (Object.keys(weightages).length > 0) {
          state.metricsWeightages = weightages;
        } else {
          state.metricsWeightages = calculateEqualWeightages(selectedMetrics);
        }
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
        
        // Update state based on API response
        Object.keys(action.payload).forEach(key => {
          // Handle metric toggles
          if (key in state.selectedMetrics) {
            state.selectedMetrics[key] = Boolean(action.payload[key]);
          }
          // Handle metric data
          else if (key.endsWith('_data')) {
            const metricId = key.replace('_data', '');
            if (!state.metricsData[metricId]) {
              state.metricsData[metricId] = {};
            }
            state.metricsData[metricId] = {
              ...state.metricsData[metricId],
              ...action.payload[key]
            };
          }
          // Handle weightages
          else if (key.endsWith('_weightage')) {
            const metricId = key.replace('_weightage', '');
            if (!state.metricsWeightages) {
              state.metricsWeightages = {};
            }
            state.metricsWeightages[metricId] = action.payload[key];
          }
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
  setMetricWeightages,
  updateMetricData,
  setSelectedActivities,
  addSelectedActivity,
  removeSelectedActivity,
  resetOptimiseState
} = optimiseSlice.actions;

export default optimiseSlice.reducer;