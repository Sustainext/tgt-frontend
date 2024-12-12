import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from "../../../../app/utils/axiosMiddleware";


const Screen9Slice = createSlice({
  name: 'governance',
  initialState: {
    statement:'',
    board_gov_statement:'',
    remuneration_policies:'',
    policy_not_public_reason:'',
    error: null
  },
  reducers: {

    setStatement: (state, action) => {
      state.statement = action.payload;
    },
    setBoardGov: (state, action) => {
        state.board_gov_statement = action.payload;
    },
    setRemunerationPolicies: (state, action) => {
        state.remuneration_policies = action.payload;
    },
    setPolicyPublic: (state, action) => {
        state.policy_not_public_reason = action.payload;
    },
  },
});

export const {
    setStatement,
    setBoardGov,
    setRemunerationPolicies,
    setPolicyPublic
} = Screen9Slice.actions;

export default Screen9Slice.reducer;