import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

// Import reducers
import counterReducer from './features/counterSlice'
import emissionReducer from './features/emissionSlice'
import screen1SliceReducer from './features/ESGSlice/screen1Slice'
import screen2SliceReducer from './features/ESGSlice/screen2Slice'
import screen3SliceReducer from './features/ESGSlice/screen3Slice'
import screen4SliceReducer from './features/ESGSlice/screen4Slice'
import screen5SliceReducer from './features/ESGSlice/screen5Slice'
import screen6SliceReducer from './features/ESGSlice/screen6Slice'
import screen7SliceReducer from './features/ESGSlice/screen7Slice'
import screen8SliceReducer from './features/ESGSlice/screen8Slice'

const rootReducer = combineReducers({
  counter: counterReducer,
  emissions: emissionReducer,
  screen1Slice:screen1SliceReducer,
  screen2Slice:screen2SliceReducer,
  screen3Slice:screen3SliceReducer,
  screen4Slice:screen4SliceReducer,
  screen5Slice:screen5SliceReducer,
  screen6Slice:screen6SliceReducer,
  screen7Slice:screen7SliceReducer,
  screen8Slice:screen8SliceReducer
})

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
  })
}