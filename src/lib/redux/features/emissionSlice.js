import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from "@/app/utils/axiosMiddleware";
import { getMonthName } from '../../../app/utils/dateUtils';

export const fetchEmissionsData = createAsyncThunk(
  'emissions/fetchEmissionsData',
  async ({ location, year, month }, thunkAPI) => {
    // Reset status before starting the async operation
    // thunkAPI.dispatch(resetClimatiqDataStatus());
    // thunkAPI.dispatch(resetScope1DataStatus());
    // thunkAPI.dispatch(resetScope2DataStatus());
    // thunkAPI.dispatch(resetScope3DataStatus());

    if (!location || !year || !month) {
      return thunkAPI.rejectWithValue('Missing required parameters');
    }

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

      const addRowType = (responseData) => {
        if (!responseData || !responseData.data) {
          return { data: [] };
        }
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

      const processScope = (response, scopeName) => {
        if (!response || !response.data || !response.data.form || !response.data.form[0]) {
          console.error(`Invalid ${scopeName} response structure`);
          return {
            [`${scopeName}Data`]: { data: [] },
            [`${scopeName}Schema`]: {},
            [`${scopeName}UiSchema`]: {}
          };
        }
        return {
          [`${scopeName}Data`]: addRowType(response.data.form_data[0]),
          [`${scopeName}Schema`]: response.data.form[0].schema || {},
          [`${scopeName}UiSchema`]: response.data.form[0].ui_schema || {}
        };
      };

      return {
        climatiqData: climatiqResponse.data || {},
        ...processScope(scope1Response, 'scope1'),
        ...processScope(scope2Response, 'scope2'),
        ...processScope(scope3Response, 'scope3'),
        params: { location, year, month }
      };
    } catch (error) {
      console.error('Error fetching emissions data:', error);
      return thunkAPI.rejectWithValue(error.response?.data || 'An error occurred while fetching data');
    }
  }
);

export const fetchPreviousMonthData = createAsyncThunk(
  'emissions/fetchPreviousMonthData',
  async ({ location, year, month }, thunkAPI) => {
    // Reset previous month data status
    // thunkAPI.dispatch(resetPreviousMonthDataStatus());

    if (!location || !year || !month) {
      return thunkAPI.rejectWithValue('Missing required parameters');
    }

    let prevMonth = parseInt(month) - 1;
    let prevYear = parseInt(year);
    if (prevMonth === 0) {
      prevMonth = 12;
      prevYear -= 1;
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
        if (!responseData || !responseData.data) {
          return { data: [] };
        }
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

      const processScope = (response, scopeName) => {
        if (!response || !response.data || !response.data.form_data) {
          console.error(`Invalid ${scopeName} response structure for previous month data`);
          return { [`${scopeName}Data`]: { data: [] } };
        }
        return { [`${scopeName}Data`]: addRowType(response.data.form_data[0]) };
      };

      return {
        ...processScope(scope1Response, 'scope1'),
        ...processScope(scope2Response, 'scope2'),
        ...processScope(scope3Response, 'scope3'),
        params: { location, year: prevYear, month: prevMonth }
      };
    } catch (error) {
      console.error('Error fetching previous month data:', error);
      return thunkAPI.rejectWithValue(error.response?.data || 'An error occurred while fetching previous month data');
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
// const formatTaskData = (task, commonData) => ({
//   location: commonData.location,
//   year: commonData.year,
//   month: commonData.month,
//   scope: commonData.scope.slice(-1),
//   category: commonData.category,
//   subcategory: commonData.subcategory,
//   activity: commonData.activity || "",
//   task_name: `${commonData.location}-${commonData.month}-${commonData.activity || commonData.subcategory}`,
//   roles: parseInt(localStorage.getItem("user_id")) === commonData.assignedTo ? 1 : 2, // Assuming this is always 1 for self-assigned tasks // 1- self-assigned, 2-assign-someone else, 3-task from mytask, 4-calculated.
//   deadline: commonData.deadline,
//   assigned_by: parseInt(localStorage.getItem("user_id")),
//   assigned_to: commonData.assignedTo,
//   region: commonData.countryCode,
//   //patch
//   //activity_id : need for calculation
//   //value1, value2, unit1, unit2, unit_type, file_uploaded_by, region, filedata: {name,url, type, size, uploadDateTime}
// });

// //Assign Tasks
// export const assignEmissionTasks = createAsyncThunk(
//   'emissions/assignEmissionTasks',
//   async (payload, { getState, dispatch }) => {
//     const { tasks, commonData } = payload;
//     const state = getState().emissions;

//     const assignTask = async (task) => {
//       const formattedTask = formatTaskData(task, commonData);
//       try {
//         const response = await axiosInstance.post('/organization_task_dashboard/', formattedTask);
//         return { ...response, originalTask: task };
//       } catch (error) {
//         console.error('Error assigning task:', error);
//         throw error;
//       }
//     };

//     try {
//       const results = await Promise.all(tasks.map(assignTask));
      
//       // Update the state to reflect the newly assigned tasks
//       results.forEach(result => {
//         const { scope } = commonData;
//         const updatedData = state[`scope${scope}Data`].data.data.map(item => 
//           item.id === result.originalTask.id 
//             ? { ...item, Emission: { ...item.Emission, rowType: 'assigned' } }
//             : item
//         );
//         dispatch(updateScopeDataLocal({ scope, data: { data: updatedData } }));
//       });

//       return results;
//     } catch (error) {
//       throw error;
//     }
//   }
// );

const formatTaskData = (task, commonData) => ({ 
  location: commonData.location, 
  year: commonData.year, 
  month: commonData.month, 
  scope: commonData.scope.slice(-1), 
  category: task.Emission.Category, 
  subcategory: task.Emission.Subcategory, 
  activity: task.Emission.Activity || "", 
  activity_id: task.Emission.activity_id || "",
  unit_type: task.Emission.unit_type || "",
  task_name: `${commonData.locationName}-${commonData.month}-${task.Emission.Activity || task.Emission.Subcategory}`, 
  roles: parseInt(localStorage.getItem("user_id")) === commonData.assignedTo ? 1 : 2,
  deadline: commonData.deadline, 
  assigned_by: parseInt(localStorage.getItem("user_id")), 
  assigned_to: commonData.assignedTo, 
  region: commonData.countryCode,
});

export const assignEmissionTasks = createAsyncThunk(
  'emissions/assignEmissionTasks',
  async (payload, { getState, dispatch }) => {
    const { tasks, commonData } = payload;

    try {
      // Format each task and send as array of objects directly
      const formattedPayload = tasks.map(task => formatTaskData(task, commonData));
      
      // Send array of formatted tasks directly
      const response = await axiosInstance.post('/organization_task_dashboard/', formattedPayload);

      return {
        response: response.data,
        assignmentDetails: {
          assignedTo: commonData.assignedTo,
          scope: commonData.scope.slice(-1),
          tasks: tasks.map(task => ({
            ...task,
            rowId: task.rowId
          }))
        }
      };
    } catch (error) {
      throw error;
    }
  }
);

export const fetchAssignedTasks = createAsyncThunk(
  'emissions/fetchAssignedTasks',
  async ({ location, year, month }) => {
    // thunkAPI.dispatch(resetAssignedTasksStatus());
    const url = `${process.env.BACKEND_API_URL}/sustainapp/get_assigned_by_task/?location=${location}&year=${year}&month=${getMonthName(month) || month}`;
    
    try {
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchApprovedTasks = createAsyncThunk(
  'emissions/fetchApprovedTasks',
  async ({ location, year, month }) => {
    // thunkAPI.dispatch(resetApprovedTasksStatus());
    const url = `${process.env.BACKEND_API_URL}/sustainapp/get_approved_task/?location=${location}&year=${year}&month=${getMonthName(month)}`;
    
    try {
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchUsers = createAsyncThunk(
  'emissions/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/sustainapp/user_client/');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const emissionsSlice = createSlice({
  name: 'emissions',
  initialState: {
    locations:[],
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
    autoFill: true,
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
    assignTaskError: null,
    assignedTasks: {
      scope1: [],
      scope2: [],
      scope3: [],
      status: 'idle',
      error: null,
    },
    approvedTasks: {
      scope1: [],
      scope2: [],
      scope3: [],
      status: 'idle',
      error: null,
    },
    users: {
      data: [],
      status: 'idle',
      error: null
    },
    scopeReRender:false
  },
  reducers: {
    setLocationsRedux: (state, action) => {
      state.locations = action.payload;
    },
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
    toggleScopeReRender: (state) => {
      state.scopeReRender = !state.scopeReRender;
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
    // Reset individual statuses to 'idle'
    resetClimatiqDataStatus: (state) => {
      state.climatiqData.status = 'idle';
      state.climatiqData.error = null;
    },
    resetScope1DataStatus: (state) => {
      state.scope1Data.status = 'idle';
      state.scope1Data.error = null;
    },
    resetScope2DataStatus: (state) => {
      state.scope2Data.status = 'idle';
      state.scope2Data.error = null;
    },
    resetScope3DataStatus: (state) => {
      state.scope3Data.status = 'idle';
      state.scope3Data.error = null;
    },
    resetPreviousMonthDataStatus: (state) => {
      state.previousMonthData.status = 'idle';
      state.previousMonthData.error = null;
    },
    resetAssignedTasksStatus: (state) => {
      state.assignedTasks.status = 'idle';
      state.assignedTasks.error = null;
    },
    resetApprovedTasksStatus: (state) => {
      state.approvedTasks.status = 'idle';
      state.approvedTasks.error = null;
    },
    resetUsersStatus: (state) => {
      state.users.status = 'idle';
      state.users.error = null;
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
        state.scopeReRender = !state.scopeReRender;
      })
      .addCase(assignEmissionTasks.rejected, (state, action) => {
        state.assignTaskStatus = 'failed';
        state.assignTaskError = action.error.message;
      })
      .addCase(fetchAssignedTasks.pending, (state) => {
        state.assignedTasks.status = 'loading';
      })
      .addCase(fetchAssignedTasks.fulfilled, (state, action) => {
        state.assignedTasks.status = 'succeeded';
        state.assignedTasks.scope1 = action.payload['1'] || [];
        state.assignedTasks.scope2 = action.payload['2'] || [];
        state.assignedTasks.scope3 = action.payload['3'] || [];
      })
      .addCase(fetchAssignedTasks.rejected, (state, action) => {
        state.assignedTasks.status = 'failed';
        state.assignedTasks.error = action.error.message;
      })
      .addCase(fetchApprovedTasks.pending, (state) => {
        state.approvedTasks.status = 'loading';
      })
      .addCase(fetchApprovedTasks.fulfilled, (state, action) => {
        state.approvedTasks.status = 'succeeded';
        state.approvedTasks.scope1 = action.payload['1'] || [];
        state.approvedTasks.scope2 = action.payload['2'] || [];
        state.approvedTasks.scope3 = action.payload['3'] || [];
      })
      .addCase(fetchApprovedTasks.rejected, (state, action) => {
        state.approvedTasks.status = 'failed';
        state.approvedTasks.error = action.error.message;
      })
      .addCase(fetchUsers.pending, (state) => {
        state.users.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users.status = 'succeeded';
        state.users.data = action.payload;
        state.users.error = null;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.users.status = 'failed';
        state.users.error = action.payload;
      });
  }
});

export const {
  setLocationsRedux,
  setLocation,
  setYear,
  setMonth,
  setCountryCode,
  updateScopeDataLocal,
  resetPreviousMonthData,
  setSelectedRows,
  toggleSelectAll,
  resetApprovedTasksStatus,
  resetAssignedTasksStatus,
  resetClimatiqDataStatus,
  resetPreviousMonthDataStatus,
  resetScope1DataStatus,
  resetScope2DataStatus,
  resetScope3DataStatus,
  resetUsersStatus,
  toggleScopeReRender
} = emissionsSlice.actions;

export default emissionsSlice.reducer;