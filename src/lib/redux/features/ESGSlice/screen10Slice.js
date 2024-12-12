import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from "../../../../app/utils/axiosMiddleware";


const Screen10Slice = createSlice({
  name: 'Sustainability Journey',
  initialState: {
    company_sustainability_statement:'',
    approach_for_sustainability:'',
    sustainability_goals:'',
    approach_to_supply_chain_sustainability:'',
    error: null
  },
  reducers: {

    setCompanyStatement: (state, action) => {
      state.company_sustainability_statement = action.payload;
    },
    setApproachSustainability: (state, action) => {
        state.approach_for_sustainability = action.payload;
    },
    setSustainabilityGoals: (state, action) => {
        state.sustainability_goals = action.payload;
    },
    setSupplyChainSustainability: (state, action) => {
        state.approach_to_supply_chain_sustainability = action.payload;
    },
  },
});

export const {
    setCompanyStatement,
    setApproachSustainability,
    setSustainabilityGoals,
    setSupplyChainSustainability
} = Screen10Slice.actions;

export default Screen10Slice.reducer;