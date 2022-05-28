import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userService from './userService'

const initialState = {
  user: null,
  supervisors: [],
  coSupervisors: [],
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

export const getAllSupervisors = createAsyncThunk(
  'users/getAllSupervisors',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token
      return await userService.getAllSupervisors(token)
    } catch (error) {
      const message = error.response.data.msg || error.message
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const getAllCoSupervisors = createAsyncThunk(
  'users/getAllCoSupervisors',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token
      return await userService.getAllCoSupervisors(token)
    } catch (error) {
      const message = error.response.data.msg || error.message
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const userSlice = createSlice({
  name: 'user',
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

      .addCase(getAllSupervisors.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllSupervisors.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.supervisors = action.payload
        state.isError = false
        state.message = ''
      })
      .addCase(getAllSupervisors.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.supervisors = null
        state.message = action.payload
        state.isSuccess = false
      })

      .addCase(getAllCoSupervisors.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllCoSupervisors.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.coSupervisors = action.payload
        state.isError = false
        state.message = ''
      })
      .addCase(getAllCoSupervisors.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.coSupervisors = null
        state.message = action.payload
        state.isSuccess = false
      })
  },
})

export const { reset } = userSlice.actions
export default userSlice.reducer
