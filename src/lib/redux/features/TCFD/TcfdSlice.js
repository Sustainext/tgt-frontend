import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const TcfdSlice = createSlice({
  name: "Tcfd",
  initialState: {
    Organization: "",
    Corporate:""

  },
  reducers: {
      setOrganization: (state, action) => {
      state.Organization = action.payload;
    },
    setCorporate: (state, action) => {
      state.Corporate = action.payload;
    },
   
  },
});

export const {
  setOrganization,
  setCorporate,

} = TcfdSlice.actions;

export default TcfdSlice.reducer;
