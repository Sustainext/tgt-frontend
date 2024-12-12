import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from "../../../../app/utils/axiosMiddleware";


const Screen6Slice = createSlice({
  name: 'description',
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
} = Screen6Slice.actions;

export default Screen6Slice.reducer;