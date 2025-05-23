import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from "../../../../app/utils/axiosMiddleware";


const Screen14Slice = createSlice({
  name: 'Community',
  initialState: {
    community_engagement_statement:'',
    impact_assessment:'',
    csr_statement:'',
    violation_rights:'',
    error: null
  },
  reducers: {

    setCommunityEngagementStatement: (state, action) => {
      state.community_engagement_statement = action.payload;
    },
    setViolationOfRights: (state, action) => {
      state.violation_rights = action.payload;
    },
    setImpactAssessment: (state, action) => {
        state.impact_assessment = action.payload;
    },
    setCSRStatement: (state, action) => {
        state.csr_statement = action.payload;
    },
  },
});

export const {
    setCommunityEngagementStatement,
    setImpactAssessment,
    setCSRStatement,
    setViolationOfRights
} = Screen14Slice.actions;

export default Screen14Slice.reducer;