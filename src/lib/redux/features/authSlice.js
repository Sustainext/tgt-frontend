import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  role: '',
  permissions: {
    collect: false,
    analyse: false,
    report: false,
    optimise: false,
    track: false
  }
}

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setRole: (state, action) => {
      state.role = action.payload;
    },
    setPermissions: (state, action) => {
      state.permissions = {
        ...state.permissions,
        ...action.payload // This allows updating only specific permissions while preserving others
      };
    }
  }
})

// Export the correct actions
export const { setRole, setPermissions } = AuthSlice.actions

export default AuthSlice.reducer
