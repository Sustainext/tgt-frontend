import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from "../../../../app/utils/axiosMiddleware";


const Screen7Slice = createSlice({
  name: 'about the report',
  initialState: {
    aboutReport:'',
    framework:'',
    externalAssurance:'',
    error: null
  },
  reducers: {

    setAboutReport: (state, action) => {
      state.aboutReport = action.payload;
    },
    setFramework: (state, action) => {
        state.framework = action.payload;
    },
    setExternalAssurance: (state, action) => {
        state.externalAssurance = action.payload;
    },
  },
});

export const {
    setAboutReport,
    setFramework,
    setExternalAssurance
} = Screen7Slice.actions;

export default Screen7Slice.reducer;