import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

// Import reducers
import counterReducer from './features/counterSlice'
// Import other reducers as needed

const rootReducer = combineReducers({
  counter: counterReducer,
  // Add other reducers here
})

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
  })
}