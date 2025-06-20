import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const TcfdSlice = createSlice({
  name: "Tcfd",
  initialState: {
    Organization: "",
    Corporate:"",
    activesection:"",

  },
  reducers: {
      setOrganization: (state, action) => {
      state.Organization = action.payload;
    },
    setCorporate: (state, action) => {
      state.Corporate = action.payload;
    },
     setActivesection: (state, action) => {
      state.activesection = action.payload;
    },
   
  },
});

export const {
  setOrganization,
  setCorporate,
  setActivesection,

} = TcfdSlice.actions;

export default TcfdSlice.reducer;
