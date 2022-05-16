import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import topicReducer from '../features/topic/topicSlice'
import evaluationReducer from '../features/evaluation/evaluationSlice'
import uiReducer from '../features/ui/uiSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    topic: topicReducer,
    evaluate: evaluationReducer,
    ui: uiReducer,
  },
})
