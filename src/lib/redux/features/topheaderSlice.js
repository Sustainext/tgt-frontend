import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  headertext1:'',
  headertext2:'',
  headerdisplay:'',
}

export const TophaderSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {
    setHeadertext1: (state, action) => {
        state.headertext1 = action.payload;
      },
      setHeadertext2: (state, action) => {
        state.headertext2 = action.payload;
      },
      setHeaderdisplay: (state, action) => {
        state.headerdisplay = action.payload;
      },
   
   
   
  },
})

export const { setHeadertext1, setHeadertext2,setHeaderdisplay} = TophaderSlice.actions
export default TophaderSlice.reducer