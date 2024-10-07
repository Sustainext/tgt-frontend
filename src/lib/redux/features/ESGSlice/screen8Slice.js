import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from "@/app/utils/axiosMiddleware";


const Screen8Slice = createSlice({
  name: 'materilaity',
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
} = Screen8Slice.actions;

export default Screen8Slice.reducer;