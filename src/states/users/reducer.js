import { createSlice } from '@reduxjs/toolkit'

import { asyncGetUsers } from './actions'

const initialState = {
  users: [],
  isLoading: false,
  error: null
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(asyncGetUsers.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(asyncGetUsers.fulfilled, (state, action) => {
        state.isLoading = false
        state.users = action.payload
      })
      .addCase(asyncGetUsers.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
  }
})

export default usersSlice.reducer
