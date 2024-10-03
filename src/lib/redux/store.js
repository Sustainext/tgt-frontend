import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

// Import reducers
import counterReducer from './features/counterSlice'
import emissionReducer from './features/emissionSlice'
import screen1SliceReducer from './features/ESGSlice/screen1Slice'

const rootReducer = combineReducers({
  counter: counterReducer,
  emissions: emissionReducer,
  screen1Slice:screen1SliceReducer,
  
})

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
  })
}