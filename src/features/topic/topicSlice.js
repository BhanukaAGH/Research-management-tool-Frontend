import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import topicService from './topicService'

const initialState = {
  topics: [],
  topic: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// create topic
export const createTopic = createAsyncThunk(
  'topic/createTopic',
  async (topicData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token
      return await topicService.createTopic(topicData, token)
    } catch (error) {
      const message = error.response.data.msg || error.message
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// get all topics
export const getAllTopics = createAsyncThunk(
  'topic/getAllTopics',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token
      return await topicService.getAllTopic(token)
    } catch (error) {
      const message = error.response.data.msg || error.message
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// get single topics
export const getSingleTopic = createAsyncThunk(
  'topic/getSingleTopic',
  async (topicId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token
      return await topicService.getSingleTopic(topicId, token)
    } catch (error) {
      const message = error.response.data.msg || error.message
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// update topic
export const updateTopic = createAsyncThunk(
  'topic/updateTopic',
  async (topicData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token
      return await topicService.updateTopic(topicData, token)
    } catch (error) {
      const message = error.response.data.msg || error.message
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// delete topic
export const deleteTopic = createAsyncThunk(
  'topic/deleteTopic',
  async (topicId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token
      return await topicService.deleteTopic(topicId, token)
    } catch (error) {
      const message = error.response.data.msg || error.message
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// request supervisor
export const requestSupervisor = createAsyncThunk(
  'topic/requestSupervisor',
  async (requestData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token
      return await topicService.requestSupervisor(requestData, token)
    } catch (error) {
      const message = error.response.data.msg || error.message
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// request co-supervisor
export const requestCoSupervisor = createAsyncThunk(
  'topic/requestCoSupervisor',
  async (requestData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token
      return await topicService.requestCoSupervisor(requestData, token)
    } catch (error) {
      const message = error.response.data.msg || error.message
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const topicSlice = createSlice({
  name: 'topic',
  initialState,
  reducers: {
    reset: (state) => {
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
    selectTopic: (state, action) => {
      state.topic = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTopic.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createTopic.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.topic = action.payload.topic
      })
      .addCase(createTopic.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.topic = null
      })

      .addCase(getAllTopics.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllTopics.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.topics = [...action.payload.topics]
      })
      .addCase(getAllTopics.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.topics = null
      })

      .addCase(getSingleTopic.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getSingleTopic.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.topic = action.payload.topic
      })
      .addCase(getSingleTopic.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.topic = null
      })

      .addCase(updateTopic.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateTopic.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.topic = action.payload.topic
      })
      .addCase(updateTopic.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.topic = null
      })

      .addCase(deleteTopic.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteTopic.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.topic = null
      })
      .addCase(deleteTopic.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.topic = null
      })

      .addCase(requestSupervisor.pending, (state) => {
        state.isLoading = true
      })
      .addCase(requestSupervisor.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.topic = action.payload.topic
      })
      .addCase(requestSupervisor.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.topic = null
      })

      .addCase(requestCoSupervisor.pending, (state) => {
        state.isLoading = true
      })
      .addCase(requestCoSupervisor.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.topic = action.payload.topic
      })
      .addCase(requestCoSupervisor.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.topic = null
      })
  },
})

export const { reset, selectTopic } = topicSlice.actions
export default topicSlice.reducer
