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

      return {
        climatiqData: climatiqResponse.data,
        scope1Data: scope1Response.data.form_data[0],
        scope1Schema: scope1Response.data.form[0].schema,
        scope1UiSchema: scope1Response.data.form[0].ui_schema,
        scope2Data: scope2Response.data.form_data[0],
        scope2Schema: scope2Response.data.form[0].schema,
        scope2UiSchema: scope2Response.data.form[0].ui_schema,
        scope3Data: scope3Response.data.form_data[0],
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

    const url = `${process.env.BACKEND_API_URL}/datametric/get-fieldgroups?path_slug=gri-environment-emissions-301-a-scope-1&&client_id=1&&user_id=1&&location=${location}&&year=${prevYear}&&month=${prevMonth}`;

    try {
      const response = await axiosInstance.get(url);
      return {
        data: response.data.form_data[0],
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

const emissionsSlice = createSlice({
  name: 'emissions',
  initialState: {
    location: '',
    year: '',
    month: 1,
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
      data: null,
      status: 'idle',
      error: null,
      params: null
    },
    updateScopeStatus: 'idle',
    updateScopeError: null,
    updateScopeParams: null
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
    updateScopeDataLocal: (state, action) => {
      const { scope, data } = action.payload;
      state[`scope${scope}Data`].data = data;
    },
    resetPreviousMonthData: (state) => {
      state.previousMonthData = {
        data: null,
        status: 'idle',
        error: null,
        params: null
      };
    }
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
        state.previousMonthData.error = null;
        state.previousMonthData.status = 'succeeded';
        state.previousMonthData.params = action.payload.params;
        state.previousMonthData.data = action.payload.data;
      })
      .addCase(fetchPreviousMonthData.rejected, (state, action) => {
        state.previousMonthData.status = 'failed';
        state.previousMonthData.error = action.error.message;
      });
  }
});

export const {
  setLocation,
  setYear,
  setMonth,
  updateScopeDataLocal,
  resetPreviousMonthData
} = emissionsSlice.actions;

export default emissionsSlice.reducer;