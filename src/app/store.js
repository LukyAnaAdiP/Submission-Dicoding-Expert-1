import { configureStore } from '@reduxjs/toolkit'
import threadReducer from '../states/threads/reducer'
import userReducer from '../states/users/reducer'
import authReducer from '../states/auth/reducer'

const store = configureStore({
  reducer: {
    threads: threadReducer,
    users: userReducer,
    auth: authReducer
  }
})

export default store
