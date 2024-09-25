import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

// Import reducers
import counterReducer from './features/counterSlice'
import emissionReducer from './features/emissionSlice'
// Import other reducers as needed

const rootReducer = combineReducers({
  counter: counterReducer,
  emissions: emissionReducer,
  // Add other reducers here
})

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
  })
}