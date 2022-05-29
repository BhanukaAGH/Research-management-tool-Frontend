import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import evaluationService from './evaluationService'

const initialState = {
  evaluation: null,
  evaluate: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

//! create evaluation
export const createEvaluation = createAsyncThunk(
  'evaluate/createEvaluation',
  async (evaluationData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token
      return await evaluationService.createEvaluation(evaluationData, token)
    } catch (error) {
      const message = error.response.data.msg || error.message
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//! get evaluation
export const getEvaluation = createAsyncThunk(
  'evaluate/getEvaluation',
  async (requestData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token
      return await evaluationService.getEvaluation(requestData, token)
    } catch (error) {
      const message = error.response.data.msg || error.message
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const evaluationSlice = createSlice({
  name: 'evaluation',
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
      .addCase(createEvaluation.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createEvaluation.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.evaluation = action.payload
      })
      .addCase(createEvaluation.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.evaluation = null
      })

      .addCase(getEvaluation.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getEvaluation.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.evaluate = action.payload
      })
      .addCase(getEvaluation.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.evaluate = null
      })
  },
})

export const { reset, evaluateMarking } = evaluationSlice.actions
export default evaluationSlice.reducer
