import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BillScreen1Slice = createSlice({
  name: "Bills Report",
  initialState: {
    about_the_Report: "",
    organization_profile_structure: "",
    business_activities: "",
    error: null,
  },
  reducers: {
    setAboutTheReport: (state, action) => {
      state.about_the_Report = action.payload;
    },
    setOrganizationprofilestructure: (state, action) => {
      state.organization_profile_structure = action.payload;
    },
    setBusinessactivities: (state, action) => {
      state.business_activities = action.payload;
    },
  },
});

export const {
  setAboutTheReport,
  setOrganizationprofilestructure,
  setBusinessactivities,
} = BillScreen1Slice.actions;

export default BillScreen1Slice.reducer;
