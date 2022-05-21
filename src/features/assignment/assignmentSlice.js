import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import assignmentService from './assignmentService'

const initialState = {
  assignments: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// get all assignments
export const getAllAssignments = createAsyncThunk(
  'assignment/getAllAssignments',
  async (_, thunkAPI) => {
    try {
      return await assignmentService.getAllAssignments()
    } catch (error) {
      const message = error.response.data.msg || error.message
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const assignmentSlice = createSlice({
  name: 'assignment',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllAssignments.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllAssignments.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.assignments = action.payload
        state.isError = false
      })
      .addCase(getAllAssignments.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.assignments = null
      })
  },
})

export const { reset } = assignmentSlice.actions
export default assignmentSlice.reducer
