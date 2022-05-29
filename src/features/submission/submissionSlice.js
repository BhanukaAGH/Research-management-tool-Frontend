import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import submissionService from './submissionService'

const initialState = {
  submissions: [],
  submission: null,
  isError: false,
  isSuccess: false,
  message: '',
}

//! submit Document
export const submitDocument = createAsyncThunk(
  'submission/submitDocument',
  async (submissionData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token
      return await submissionService.submitDocument(submissionData, token)
    } catch (error) {
      const message = error.response.data.msg || error.message
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//! get all Submissions
export const getAllSubmissions = createAsyncThunk(
  'submission/getAllSubmissions',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token
      return await submissionService.getAllSubmissions(token)
    } catch (error) {
      const message = error.response.data.msg || error.message
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//! get student Submissions
export const getStudentSubmissions = createAsyncThunk(
  'submission/getStudentSubmissions',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token
      const userId = thunkAPI.getState().auth.user.userId
      return await submissionService.getStudentSubmissions(userId, token)
    } catch (error) {
      const message = error.response.data.msg || error.message
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//! get Submission
export const getSubmission = createAsyncThunk(
  'submission/getSubmission',
  async (submissionId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token
      const userId = thunkAPI.getState().auth.user.userId
      return await submissionService.getSubmission(submissionId, userId, token)
    } catch (error) {
      const message = error.response.data.msg || error.message
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const submissionSlice = createSlice({
  name: 'submission',
  initialState,
  reducers: {
    reset: (state) => {
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitDocument.pending, (state) => {
        state.isLoading = true
      })
      .addCase(submitDocument.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.submission = action.payload
        state.isError = false
      })
      .addCase(submitDocument.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.submission = null
      })

      .addCase(getAllSubmissions.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllSubmissions.fulfilled, (state, action) => {
        state.isLoading = false
        state.submissions = action.payload
        state.isError = false
      })
      .addCase(getAllSubmissions.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.submissions = null
      })

      .addCase(getStudentSubmissions.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getStudentSubmissions.fulfilled, (state, action) => {
        state.isLoading = false
        state.submission = action.payload
        state.isError = false
      })
      .addCase(getStudentSubmissions.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.submission = null
      })

      .addCase(getSubmission.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getSubmission.fulfilled, (state, action) => {
        state.isLoading = false
        state.submission = action.payload
        state.isError = false
      })
      .addCase(getSubmission.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.submission = null
      })
  },
})

export const { reset } = submissionSlice.actions
export default submissionSlice.reducer
