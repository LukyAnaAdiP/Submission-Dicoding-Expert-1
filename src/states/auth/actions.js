import { createAsyncThunk } from '@reduxjs/toolkit'

import api from '../../utils/api'

const asyncRegister = createAsyncThunk(
  'auth/register',
  async ({ name, email, password }) => {
    const response = await api('/register', {
      method: 'POST',
      body: JSON.stringify({
        name,
        email,
        password
      })
    })

    return response.data.user
  }
)

const asyncLogin = createAsyncThunk(
  'auth/login',
  async ({ email, password }) => {
    const response = await api('/login', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password
      })
    })

    return response.data.token
  }
)

const asyncGetOwnProfile = createAsyncThunk(
  'auth/getOwnProfile',
  async (token) => {
    const response = await api('/users/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return response.data.user
  }
)

export {
  asyncGetOwnProfile,
  asyncLogin,
  asyncRegister
}
