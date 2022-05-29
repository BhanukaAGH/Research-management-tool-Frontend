import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  openProfile: false,
  submit: false,
  selectFile: null,
  createTopicState: false,
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleProfile: (state, action) => {
      state.openProfile = action.payload || !state.openProfile
    },
    submitSubmission: (state, action) => {
      state.submit = action.payload
    },
    setSelectFile: (state, action) => {
      state.selectFile = action.payload
    },
    setCreateTopic: (state, action) => {
      state.createTopicState = action.payload
    },
  },
})

export const {
  toggleProfile,
  submitSubmission,
  setSelectFile,
  setCreateTopic,
} = uiSlice.actions
export default uiSlice.reducer
