import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from "@/app/utils/axiosMiddleware";

export const fetchEmissionsData = createAsyncThunk(
  'emissions/fetchEmissionsData',
  async ({ location, year, month }) => {
    const base_url = `${process.env.BACKEND_API_URL}/datametric/get-climatiq-score?`;
    const climatiqUrl = `${base_url}location=${location}&&year=${year}&&month=${month}`;
    
    const scopeBaseUrl = `${process.env.BACKEND_API_URL}/datametric/get-fieldgroups?`;
    const scope1Url = `${scopeBaseUrl}path_slug=gri-environment-emissions-301-a-scope-1&&client_id=1&&user_id=1&&location=${location}&&year=${year}&&month=${month}`;
    const scope2Url = `${scopeBaseUrl}path_slug=gri-environment-emissions-301-a-scope-2&&client_id=1&&user_id=1&&location=${location}&&year=${year}&&month=${month}`;
    const scope3Url = `${scopeBaseUrl}path_slug=gri-environment-emissions-301-a-scope-3&&client_id=1&&user_id=1&&location=${location}&&year=${year}&&month=${month}`;

    try {
      const [climatiqResponse, scope1Response, scope2Response, scope3Response] = await Promise.all([
        axiosInstance.get(climatiqUrl),
        axiosInstance.get(scope1Url),
        axiosInstance.get(scope2Url),
        axiosInstance.get(scope3Url)
      ]);      

       // Function to add rowType to Emission objects
       const addRowType = (responseData) => {
        return {
          ...responseData,
          data: responseData.data.map(item => ({
            ...item,
            Emission: {
              ...item.Emission,
              rowType: 'calculated'
            }
          }))
        };
      };

      return {
        climatiqData: climatiqResponse.data,
        scope1Data: addRowType(scope1Response.data.form_data[0]),
        scope1Schema: scope1Response.data.form[0].schema,
        scope1UiSchema: scope1Response.data.form[0].ui_schema,
        scope2Data: addRowType(scope2Response.data.form_data[0]),
        scope2Schema: scope2Response.data.form[0].schema,
        scope2UiSchema: scope2Response.data.form[0].ui_schema,
        scope3Data: addRowType(scope3Response.data.form_data[0]),
        scope3Schema: scope3Response.data.form[0].schema,
        scope3UiSchema: scope3Response.data.form[0].ui_schema,
        params: { location, year, month }
      };
    } catch (error) {
      throw error;
    }
  }
);

export const fetchPreviousMonthData = createAsyncThunk(
  'emissions/fetchPreviousMonthData',
  async ({ location, year, month }, thunkAPI) => {
    let prevMonth = month - 1;
    let prevYear = year;
    if (prevMonth === 0) {
      prevMonth = 12;
      prevYear = year - 1;
    }

    const scopeBaseUrl = `${process.env.BACKEND_API_URL}/datametric/get-fieldgroups?`;
    const scope1Url = `${scopeBaseUrl}path_slug=gri-environment-emissions-301-a-scope-1&&client_id=1&&user_id=1&&location=${location}&&year=${prevYear}&&month=${prevMonth}`;
    const scope2Url = `${scopeBaseUrl}path_slug=gri-environment-emissions-301-a-scope-2&&client_id=1&&user_id=1&&location=${location}&&year=${prevYear}&&month=${prevMonth}`;
    const scope3Url = `${scopeBaseUrl}path_slug=gri-environment-emissions-301-a-scope-3&&client_id=1&&user_id=1&&location=${location}&&year=${prevYear}&&month=${prevMonth}`;

    try {
      const [scope1Response, scope2Response, scope3Response] = await Promise.all([
        axiosInstance.get(scope1Url),
        axiosInstance.get(scope2Url),
        axiosInstance.get(scope3Url)
      ]);

      const addRowType = (responseData) => {
        return {
          ...responseData,
          data: responseData.data.map(item => ({
            ...item,
            Emission: {
              ...item.Emission,
              rowType: 'default'
            }
          }))
        };
      };

      return {
        scope1Data: addRowType(scope1Response.data.form_data[0]),
        scope2Data: addRowType(scope2Response.data.form_data[0]),
        scope3Data: addRowType(scope3Response.data.form_data[0]),
        params: { location, year: prevYear, month: prevMonth }
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateScopeData = createAsyncThunk(
  'emissions/updateScopeData',
  async ({ scope, data, location, year, month }) => {
    const url = `${process.env.BACKEND_API_URL}/datametric/update-fieldgroup`;
    const body = {
      client_id: 1,
      user_id: 1,
      path: `gri-environment-emissions-301-a-scope-${scope}`,
      form_data: data.data,
      location,
      year,
      month,
    };

    try {
      const response = await axiosInstance.post(url, body);
      return { scope, data: response.data, params: { location, year, month } };
    } catch (error) {
      throw error;
    }
  }
);

const calculateTotalClimatiqScore = (data) => {
  if (data && data.result && Array.isArray(data.result)) {
    const total = data.result.reduce((sum, item) => sum + (item.co2e || 0), 0);
    return (total / 1000).toFixed(3);
  }
  return 0;
};

// Assign Task 
const formatTaskData = (task, commonData) => ({
  location: commonData.location,
  year: commonData.year,
  subcategory: commonData.Subcategory,
  activity: commonData.activity || "",
  task_name: `${commonData.location}-${commonData.month}-${commonData.Activity || commonData.Subcategory}`,
  scope: commonData.scope,
  month: commonData.month,
  roles: 1, // Assuming this is always 1 for self-assigned tasks
  deadline: commonData.deadline,
  assigned_by: parseInt(localStorage.getItem("user_id")),
  assigned_to: commonData.assignedTo,
  user_client: 1, // Assuming this is always 1
  category: commonData.Category,
  region: commonData.countryCode,
});

export const assignEmissionTasks = createAsyncThunk(
  'emissions/assignEmissionTasks',
  async (payload, { getState, dispatch }) => {
    const { tasks, commonData } = payload;
    const state = getState().emissions;

    const assignTask = async (task) => {
      const formattedTask = formatTaskData(task, commonData);
      try {
        const response = await axiosInstance.post('/organization_task_dashboard/', formattedTask);
        return { ...response, originalTask: task };
      } catch (error) {
        console.error('Error assigning task:', error);
        throw error;
      }
    };

    try {
      const results = await Promise.all(tasks.map(assignTask));
      
      // Update the state to reflect the newly assigned tasks
      results.forEach(result => {
        const { scope } = commonData;
        const updatedData = state[`scope${scope}Data`].data.data.map(item => 
          item.id === result.originalTask.id 
            ? { ...item, Emission: { ...item.Emission, rowType: 'assigned' } }
            : item
        );
        dispatch(updateScopeDataLocal({ scope, data: { data: updatedData } }));
      });

      return results;
    } catch (error) {
      throw error;
    }
  }
);

const emissionsSlice = createSlice({
  name: 'emissions',
  initialState: {
    location: '',
    year: '',
    month: 1,
    countryCode: '',
    climatiqData: {
      rawData: {},
      totalScore: 0,
      status: 'idle',
      error: null,
      params: null
    },
    scope1Data: {
      data: [],
      schema:{},
      uiSchema: {},
      status: 'idle',
      error: null,
      params: null
    },
    scope2Data: {
      data: [],
      schema:{},
      uiSchema: {},
      status: 'idle',
      error: null,
      params: null
    },
    scope3Data: {
      data: [],
      schema:{},
      uiSchema: {},
      status: 'idle',
      error: null,
      params: null
    },
    previousMonthData: {
      scope1Data: null,
      scope2Data: null,
      scope3Data: null,
      status: 'idle',
      error: null,
      params: null
    },
    updateScopeStatus: 'idle',
    updateScopeError: null,
    updateScopeParams: null,
    autoFill: false,
    selectedRows: {
      scope1: [],
      scope2: [],
      scope3: []
    },
    selectAllChecked:{
      scope1: false,
      scope2: false,
      scope3: false
    },
    assignTaskStatus: 'idle',
    assignTaskError: null
  },
  reducers: {
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    setYear: (state, action) => {
      state.year = action.payload;
    },
    setMonth: (state, action) => {
      state.month = action.payload;
    },
    setCountryCode: (state, action) => {
      state.countryCode = action.payload;
    },
    updateScopeDataLocal: (state, action) => {
      const { scope, data } = action.payload;
      state[`scope${scope}Data`].data = data;
    },
    resetPreviousMonthData: (state) => {
      state.previousMonthData = {
        scope1Data: null,
        scope2Data: null,
        scope3Data: null,
        status: 'idle',
        error: null,
        params: null
      };
    },
    setSelectedRows: (state, action) => {
      const { scope, rowId, isSelected, rowData } = action.payload;
      
      if (isSelected) {
        // If the row doesn't exist in the array, add it
        if (!state.selectedRows[scope].some(row => row.rowId === rowId)) {
          state.selectedRows[scope].push({ rowId, ...rowData, isSelected: true });
        } else {
          // If it exists, update its selection state
          const rowIndex = state.selectedRows[scope].findIndex(row => row.rowId === rowId);
          state.selectedRows[scope][rowIndex].isSelected = true;
        }
      } else {
        // Remove the row if it's being deselected
        state.selectedRows[scope] = state.selectedRows[scope].filter(row => row.rowId !== rowId);
      }
    
      // Update selectAllChecked based on whether all selectable rows are selected
      const allRows = state[`${scope}Data`].data?.data || [];
      const selectableRowsCount = allRows.filter(row => !['calculated', 'approved', 'assigned'].includes(row.Emission?.rowType)).length;
      const selectedRowsCount = state.selectedRows[scope].length;
      state.selectAllChecked[scope] = selectableRowsCount > 0 && selectedRowsCount === selectableRowsCount;
    },
    toggleSelectAll: (state, action) => {
      const { scope, isChecked } = action.payload;
      state.selectAllChecked[scope] = isChecked;
      const allRows = state[`${scope}Data`].data?.data || [];
      
      if (isChecked) {
        state.selectedRows[scope] = allRows
          .map((row, index) => {
            if (!['calculated', 'approved', 'assigned'].includes(row.Emission?.rowType)) {
              return {
                rowId: `${scope}_${index}`,
                ...row,
                isSelected: true
              };
            }
            return null;
          })
          .filter(Boolean);
      } else {
        state.selectedRows[scope] = [];
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmissionsData.pending, (state) => {
        state.climatiqData.status = 'loading';
        state.scope1Data.status = 'loading';
        state.scope2Data.status = 'loading';
        state.scope3Data.status = 'loading';
      })
      .addCase(fetchEmissionsData.fulfilled, (state, action) => {
        state.climatiqData.status = 'succeeded';
        state.scope1Data.status = 'succeeded';
        state.scope2Data.status = 'succeeded';
        state.scope3Data.status = 'succeeded';
        
        state.climatiqData.rawData = action.payload.climatiqData;
        state.climatiqData.totalScore = calculateTotalClimatiqScore(action.payload.climatiqData);
        state.scope1Data.data = action.payload.scope1Data;
        state.scope2Data.data = action.payload.scope2Data;
        state.scope3Data.data = action.payload.scope3Data;

        state.scope1Data.schema = action.payload.scope1Schema;
        state.scope2Data.schema = action.payload.scope2Schema;
        state.scope3Data.schema = action.payload.scope3Schema;

        state.scope1Data.uiSchema = action.payload.scope1UiSchema;
        state.scope2Data.uiSchema = action.payload.scope2UiSchema;
        state.scope3Data.uiSchema = action.payload.scope3UiSchema;

        state.climatiqData.params = action.payload.params;
        state.scope1Data.params = action.payload.params;
        state.scope2Data.params = action.payload.params;
        state.scope3Data.params = action.payload.params;
      })
      .addCase(fetchEmissionsData.rejected, (state, action) => {
        state.climatiqData.status = 'failed';
        state.scope1Data.status = 'failed';
        state.scope2Data.status = 'failed';
        state.scope3Data.status = 'failed';
        
        state.climatiqData.error = action.error.message;
        state.scope1Data.error = action.error.message;
        state.scope2Data.error = action.error.message;
        state.scope3Data.error = action.error.message;
      })
      .addCase(updateScopeData.pending, (state) => {
        state.updateScopeStatus = 'loading';
      })
      .addCase(updateScopeData.fulfilled, (state, action) => {
        state.updateScopeStatus = 'succeeded';
        const { scope, data, params } = action.payload;
        state[`scope${scope}Data`].data = data;
        state.updateScopeParams = params;
      })
      .addCase(updateScopeData.rejected, (state, action) => {
        state.updateScopeStatus = 'failed';
        state.updateScopeError = action.error.message;
      })
      .addCase(fetchPreviousMonthData.pending, (state) => {
        state.previousMonthData.status = 'loading';
      })
      .addCase(fetchPreviousMonthData.fulfilled, (state, action) => {
        state.previousMonthData.scope1Data = action.payload.scope1Data;
        state.previousMonthData.scope2Data = action.payload.scope2Data;
        state.previousMonthData.scope3Data = action.payload.scope3Data;
        state.previousMonthData.error = null;
        state.previousMonthData.status = 'succeeded';
        state.previousMonthData.params = action.payload.params;
      })
      .addCase(fetchPreviousMonthData.rejected, (state, action) => {
        state.previousMonthData.status = 'failed';
        state.previousMonthData.error = action.error.message;
      })
      .addCase(assignEmissionTasks.pending, (state) => {
        state.assignTaskStatus = 'loading';
      })
      .addCase(assignEmissionTasks.fulfilled, (state, action) => {
        state.assignTaskStatus = 'succeeded';
        // The state update is handled in the thunk itself
      })
      .addCase(assignEmissionTasks.rejected, (state, action) => {
        state.assignTaskStatus = 'failed';
        state.assignTaskError = action.error.message;
      });
  }
});

export const {
  setLocation,
  setYear,
  setMonth,
  setCountryCode,
  updateScopeDataLocal,
  resetPreviousMonthData,
  setSelectedRows,
  toggleSelectAll
} = emissionsSlice.actions;

export default emissionsSlice.reducer;