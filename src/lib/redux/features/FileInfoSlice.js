import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  locationname: '',
  year: '',
  monthname: 'Jan',
  sectionname: '',
  tabname: '',
};

const FileInfoSlice = createSlice({
  name: 'fileinfo',
  initialState,
  reducers: {
    f_setLocationName: (state, action) => {
      state.locationname = action.payload;
    },
    f_setYear: (state, action) => {
      state.year = action.payload;
    },
    f_setMonthName: (state, action) => {
      state.monthname = action.payload;
    },
    f_setSectionName: (state, action) => {
      state.sectionname = action.payload;
    },
    f_setTabName: (state, action) => {
      state.tabname = action.payload;
    },
  },
});

export const {
  f_setLocationName,
  f_setYear,
  f_setMonthName,
  f_setSectionName,
  f_setTabName,
} = FileInfoSlice.actions;

export default FileInfoSlice.reducer;