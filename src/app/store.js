import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import topicReducer from '../features/topic/topicSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    topic: topicReducer,
  },
})
