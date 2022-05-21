import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import userReducer from '../features/user/userSlice'
import topicReducer from '../features/topic/topicSlice'
import evaluationReducer from '../features/evaluation/evaluationSlice'
import assignmentReducer from '../features/assignment/assignmentSlice'
import submissionReducer from '../features/submission/submissionSlice'
import uiReducer from '../features/ui/uiSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    topic: topicReducer,
    evaluate: evaluationReducer,
    assignment: assignmentReducer,
    submission: submissionReducer,
    ui: uiReducer,
  },
})
