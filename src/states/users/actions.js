import { createAsyncThunk } from '@reduxjs/toolkit'

import api from '../../utils/api'

const asyncGetUsers = createAsyncThunk(
  'users/getUsers',
  async () => {
    const response = await api('/users')

    return response.data.users
  }
)

export {
  asyncGetUsers
}
