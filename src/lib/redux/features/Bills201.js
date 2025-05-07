import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  org: "",
  corp: "",
  year: "",
  reportType:"",
};

export const Bills201 = createSlice({
  name: "Bills201",
  initialState,
  reducers: {
    setOrgnization: (state, action) => {
      state.org = action.payload;
    },
    setCorporate: (state, action) => {
      state.corp = action.payload;
    },
    setyear: (state, action) => {
      state.year = action.payload;
    },
    setReportTypes: (state, action) => {
      state.reportType = action.payload;
    },
  },
});

export const { setOrgnization, setCorporate, setyear,setReportTypes } = Bills201.actions;
export default Bills201.reducer;
