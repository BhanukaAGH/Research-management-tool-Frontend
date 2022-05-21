import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import userReducer from '../features/user/userSlice'
import topicReducer from '../features/topic/topicSlice'
import evaluationReducer from '../features/evaluation/evaluationSlice'
import uiReducer from '../features/ui/uiSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    topic: topicReducer,
    evaluate: evaluationReducer,
    ui: uiReducer,
  },
})
