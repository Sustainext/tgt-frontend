import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from "../../../../app/utils/axiosMiddleware";


const Screen5Slice = createSlice({
  name: 'awards',
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
} = Screen5Slice.actions;

export default Screen5Slice.reducer;