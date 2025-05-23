import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BillScreen1Slice = createSlice({
  name: "Bills Report",
  initialState: {
    about_the_Report: "",
    organization_profile_structure: "",
    business_activities: "",
    Supply_chains: "",
    policies_diligence_processes: "",
    risks_forced_child_labour: "",
    reduce_forced_child_labour: "",
    remediation_loss_income: "",
    training_forced_child_labour:"",
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
    setSupplychains: (state, action) => {
      state.Supply_chains = action.payload;
    },
    setPoliciesdiligence: (state, action) => {
      state.policies_diligence_processes = action.payload;
    },
    setRisksforcedchildlabour: (state, action) => {
      state.risks_forced_child_labour = action.payload;
    },
    setReduceforcedchildlabour: (state, action) => {
      state.reduce_forced_child_labour = action.payload;
    },
    setRemediationlossincome: (state, action) => {
      state.remediation_loss_income = action.payload;
    },
      setTrainingforcedchildlabour: (state, action) => {
      state.training_forced_child_labour = action.payload;
    },
  },
});

export const {
  setAboutTheReport,
  setOrganizationprofilestructure,
  setBusinessactivities,
  setSupplychains,
  setPoliciesdiligence,
  setRisksforcedchildlabour,
  setReduceforcedchildlabour,
  setRemediationlossincome,
  setTrainingforcedchildlabour,
} = BillScreen1Slice.actions;

export default BillScreen1Slice.reducer;
