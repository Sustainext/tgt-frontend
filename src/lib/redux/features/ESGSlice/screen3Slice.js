import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from "../../../../app/utils/axiosMiddleware";


const Screen3Slice = createSlice({
  name: 'mission',
  initialState: {
    mission:'',
    error: null
  },
  reducers: {

    setMission: (state, action) => {
      state.mission = action.payload;
    },
  },
});

export const {
    setMission
} = Screen3Slice.actions;

export default Screen3Slice.reducer;