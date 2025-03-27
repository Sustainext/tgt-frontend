import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from "../../../../app/utils/axiosMiddleware";


const Screen11Slice = createSlice({
  name: 'Economic Performance',
  initialState: {
    company_economic_performance_statement:'',
    financial_assistance_from_government:'',
    introduction_to_economic_value_creation:'',
    infrastructure_investement:'',
    getdata:'',
    error: null
  },
  reducers: {

    setCompanyeconomic: (state, action) => {
      state.company_economic_performance_statement = action.payload;
    },
    setInfrastructureInvestment: (state, action) => {
      state.infrastructure_investement = action.payload;
    },
    setFinancialassistanc: (state, action) => {
        state.financial_assistance_from_government = action.payload;
    },
    setIntroductionto: (state, action) => {
        state.introduction_to_economic_value_creation = action.payload;
    },
    setgetdata: (state, action) => {
        state.getdata = action.payload;
    },
 
  },
});

export const {
    setCompanyeconomic,
    setFinancialassistanc,
    setIntroductionto,
    setInfrastructureInvestment,
    setgetdata,
} = Screen11Slice.actions;

export default Screen11Slice.reducer;