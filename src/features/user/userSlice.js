import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userService from './userService'

const initialState = {
  user: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
}

export const getCurrentUser = createAsyncThunk(
  'users/getUser',
  async (userId, thunkAPI) => {
    try {
      return await userService.getCurrentUser(userId)
    } catch (error) {
      const message =
        error?.response?.data?.msg || error.message || error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const updateUserPicture = createAsyncThunk(
  'users/update-profile-pic',
  async (photoData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token
      return await userService.updateUserPicture(photoData, token)
    } catch (error) {
      const message =
        error?.response?.data?.msg || error.message || error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const userSlice = createSlice({
  name: 'user',
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
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
        state.isError = false
        state.message = ''
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.isLoading = false
        state.user = null
        state.isError = true
        state.message = action.payload
        state.isSuccess = false
      })

      .addCase(updateUserPicture.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateUserPicture.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
        state.isError = false
        state.message = ''
      })
      .addCase(updateUserPicture.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.isSuccess = false
      })
  },
})

export const { reset } = userSlice.actions
export default userSlice.reducer
