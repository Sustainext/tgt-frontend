import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

// Import reducers
import counterReducer from "./features/counterSlice";
import emissionReducer from "./features/emissionSlice";
import screen1SliceReducer from "./features/ESGSlice/screen1Slice";
import screen2SliceReducer from "./features/ESGSlice/screen2Slice";
import usersReducer from "./features/userSlice";
import headerReducer from "./features/topheaderSlice";
import screen3SliceReducer from "./features/ESGSlice/screen3Slice";
import screen4SliceReducer from "./features/ESGSlice/screen4Slice";
import screen5SliceReducer from "./features/ESGSlice/screen5Slice";
import screen6SliceReducer from "./features/ESGSlice/screen6Slice";
import screen7SliceReducer from "./features/ESGSlice/screen7Slice";
import screen8SliceReducer from "./features/ESGSlice/screen8Slice";
import screen9SliceReducer from "./features/ESGSlice/screen9Slice";
import screen10SliceReducer from "./features/ESGSlice/screen10Slice";
import screen12SliceReducer from "./features/ESGSlice/screen12Slice";
import screen14SliceReducer from "./features/ESGSlice/screen14Slice";
import screen11SliceReducr from "./features/ESGSlice/screen11Slice";
import RolespermissionsReducer from "./features/roles-permissionsSlice";
import AuthReducer from "./features/authSlice";
import screen13SliceReducer from "./features/ESGSlice/screen13Slice";
import screen15SliceReducer from "./features/ESGSlice/screen15Slice";
import materialitySliceReducer from "./features/materialitySlice";
import FileInfoSliceReducer from "./features/FileInfoSlice";
import optimiseSliceReduceer from "./features/optimiseSlice";
import Bills201 from "./features/Bills201";
import BillScreen1Slice from "./features/Billsreport/Billscreen1Slice";
import reportBuilderReducer from './features/reportBuilderSlice';
import reportCreationReducer from './features/reportCreationSlice'

import TcfdSlice from "./features/TCFD/TcfdSlice"
const rootReducer = combineReducers({
  counter: counterReducer,
  emissions: emissionReducer,
  screen1Slice: screen1SliceReducer,
  screen2Slice: screen2SliceReducer,
  users: usersReducer,
  header: headerReducer,
  screen3Slice: screen3SliceReducer,
  screen4Slice: screen4SliceReducer,
  screen5Slice: screen5SliceReducer,
  screen6Slice: screen6SliceReducer,
  screen7Slice: screen7SliceReducer,
  screen8Slice: screen8SliceReducer,
  screen9Slice: screen9SliceReducer,
  screen11Slice: screen11SliceReducr,
  screen10Slice: screen10SliceReducer,
  screen12Slice: screen12SliceReducer,
  screen14Slice: screen14SliceReducer,
  roleprmission: RolespermissionsReducer,
  auth: AuthReducer,
  screen13Slice: screen13SliceReducer,
  screen15Slice: screen15SliceReducer,
  materialitySlice: materialitySliceReducer,
  FileInfoSlice: FileInfoSliceReducer,
  optimise: optimiseSliceReduceer,
  bils201filter: Bills201,
  BillScreen1About: BillScreen1Slice,
  Tcfd:TcfdSlice,
  reportBuilder: reportBuilderReducer,
  reportCreation: reportCreationReducer,
});

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};
