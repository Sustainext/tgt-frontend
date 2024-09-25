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
        scope1Data: scope1Response.data.form_data[0].data,
        scope2Data: scope2Response.data.form_data[0].data,
        scope3Data: scope3Response.data.form_data[0].data
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
      return response.data.form_data[0].data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
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
    organization:'',
    corporate:'',
    location:'',
    month:'',
    climatiqData: {
      rawData: {},
      totalScore: 0
    },
    scope1Data: [],
    scope2Data: [],
    scope3Data: [],
    previousMonthData: null,
    status: 'idle',
    error: null
  },
  reducers: {
    setClimatiqData: (state, action) => {
      state.climatiqData.rawData = action.payload;
      state.climatiqData.totalScore = calculateTotalClimatiqScore(action.payload);
    },
    setScope1Data: (state, action) => {
      state.scope1Data = action.payload;
    },
    setScope2Data: (state, action) => {
      state.scope2Data = action.payload;
    },
    setScope3Data: (state, action) => {
      state.scope3Data = action.payload;
    },
    resetPreviousMonthData: (state) => {
      state.previousMonthData = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmissionsData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEmissionsData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.climatiqData.rawData = action.payload.climatiqData;
        state.climatiqData.totalScore = calculateTotalClimatiqScore(action.payload.climatiqData);
        state.scope1Data = action.payload.scope1Data;
        state.scope2Data = action.payload.scope2Data;
        state.scope3Data = action.payload.scope3Data;
      })
      .addCase(fetchEmissionsData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchPreviousMonthData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPreviousMonthData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.previousMonthData = action.payload;
      })
      .addCase(fetchPreviousMonthData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const {
  setClimatiqData,
  setScope1Data,
  setScope2Data,
  setScope3Data,
  resetPreviousMonthData
} = emissionsSlice.actions;

export default emissionsSlice.reducer;