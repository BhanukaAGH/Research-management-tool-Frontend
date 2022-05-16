import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  openProfile: false,
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleProfile: (state, action) => {
      state.openProfile = action.payload || !state.openProfile
    },
  },
})

export const { toggleProfile } = uiSlice.actions
export default uiSlice.reducer
