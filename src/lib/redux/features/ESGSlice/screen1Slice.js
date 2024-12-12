import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from "../../../../app/utils/axiosMiddleware";

// export const fetchEmissionsData = createAsyncThunk(
//   'emissions/fetchEmissionsData',
//   async ({ location, year, month }) => {
//     const base_url = `${process.env.BACKEND_API_URL}/datametric/get-climatiq-score?`;
//     const climatiqUrl = `${base_url}location=${location}&&year=${year}&&month=${month}`;
    
//     const scopeBaseUrl = `${process.env.BACKEND_API_URL}/datametric/get-fieldgroups?`;
//     const scope1Url = `${scopeBaseUrl}path_slug=gri-environment-emissions-301-a-scope-1&&client_id=1&&user_id=1&&location=${location}&&year=${year}&&month=${month}`;
//     const scope2Url = `${scopeBaseUrl}path_slug=gri-environment-emissions-301-a-scope-2&&client_id=1&&user_id=1&&location=${location}&&year=${year}&&month=${month}`;
//     const scope3Url = `${scopeBaseUrl}path_slug=gri-environment-emissions-301-a-scope-3&&client_id=1&&user_id=1&&location=${location}&&year=${year}&&month=${month}`;

//     try {
//       const [climatiqResponse, scope1Response, scope2Response, scope3Response] = await Promise.all([
//         axiosInstance.get(climatiqUrl),
//         axiosInstance.get(scope1Url),
//         axiosInstance.get(scope2Url),
//         axiosInstance.get(scope3Url)
//       ]);      

//       return {
//         climatiqData: climatiqResponse.data,
//         scope1Data: scope1Response.data.form_data[0].data,
//         scope2Data: scope2Response.data.form_data[0].data,
//         scope3Data: scope3Response.data.form_data[0].data
//       };
//       console.log({
//         climatiqData: climatiqResponse.data,
//         scope1Data: scope1Response.data.form_data[0].data,
//         scope2Data: scope2Response.data.form_data[0].data,
//         scope3Data: scope3Response.data.form_data[0].data
//       })
//     } catch (error) {
//       throw error;
//     }
//   }
// );

// export const fetchPreviousMonthData = createAsyncThunk(
//   'emissions/fetchPreviousMonthData',
//   async ({ location, year, month }, thunkAPI) => {
//     let prevMonth = month - 1;
//     let prevYear = year;
//     if (prevMonth === 0) {
//       prevMonth = 12;
//       prevYear = year - 1;
//     }

//     const url = `${process.env.BACKEND_API_URL}/datametric/get-fieldgroups?path_slug=gri-environment-emissions-301-a-scope-1&&client_id=1&&user_id=1&&location=${location}&&year=${prevYear}&&month=${prevMonth}`;

//     try {
//       const response = await axiosInstance.get(url);
//       return response.data.form_data[0].data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response.data);
//     }
//   }
// );

// const calculateTotalClimatiqScore = (data) => {
//   if (data && data.result && Array.isArray(data.result)) {
//     const total = data.result.reduce((sum, item) => sum + (item.co2e || 0), 0);
//     return (total / 1000).toFixed(3);
//   }
//   return 0;
// };
const orgName= typeof window !== "undefined" ? localStorage.getItem("reportorgname") : "";
const Screen1Slice = createSlice({
  name: 'emissions',
  initialState: {
    message:'',
    ceo_name:'',
    company_name:orgName,
    message_image:'',
    signature_image:'',
    error: null
  },
  reducers: {

    setMessage: (state, action) => {
      state.message = action.payload;
    },
    setCeoname: (state, action) => {
      state.ceo_name = action.payload;
    },
    setCompanyname: (state, action) => {
      state.company_name = action.payload;
    },
    setMessageimage: (state, action) => {
        state.message_image = action.payload;
      },
      setSignatureimage: (state, action) => {
        state.signature_image = action.payload;
      },
  },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchEmissionsData.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchEmissionsData.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.climatiqData.rawData = action.payload.climatiqData;
//         state.climatiqData.totalScore = calculateTotalClimatiqScore(action.payload.climatiqData);
//         state.scope1Data = action.payload.scope1Data;
//         state.scope2Data = action.payload.scope2Data;
//         state.scope3Data = action.payload.scope3Data;
//       })
//       .addCase(fetchEmissionsData.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       })
//       .addCase(fetchPreviousMonthData.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchPreviousMonthData.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.previousMonthData = action.payload;
//       })
//       .addCase(fetchPreviousMonthData.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       });
//   }
});

export const {
setMessage,
setCeoname,
setCompanyname,
setMessageimage,
setSignatureimage
} = Screen1Slice.actions;

export default Screen1Slice.reducer;