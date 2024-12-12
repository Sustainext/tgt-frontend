import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from "../../../../app/utils/axiosMiddleware";


const Screen15Slice = createSlice({
  name: 'Customers',
  initialState: {
    commitment_statement:'',
    product_info_labelling:'',
    marketing_practices:'',
    conclusion:'',
    error: null
  },
  reducers: {

    setCommitmentStatement: (state, action) => {
      state.commitment_statement = action.payload;
    },
    setProductInfo: (state, action) => {
        state.product_info_labelling = action.payload;
    },
    setMarketingPractices: (state, action) => {
        state.marketing_practices = action.payload;
    },
    setConclusion: (state, action) => {
        state.conclusion = action.payload;
    },
 
  },
});

export const {
    setCommitmentStatement,
    setProductInfo,
    setMarketingPractices,
    setConclusion,
} = Screen15Slice.actions;

export default Screen15Slice.reducer;