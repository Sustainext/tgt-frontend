import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from "../../../../app/utils/axiosMiddleware";


const Screen4Slice = createSlice({
  name: 'sustainibilityRoadmap',
  initialState: {
    description:'',
    error: null
  },
  reducers: {

    setdescription: (state, action) => {
      state.description = action.payload;
    },
  },
});

export const {
    setdescription
} = Screen4Slice.actions;

export default Screen4Slice.reducer;