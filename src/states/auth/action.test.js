
import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('../../utils/api', () => ({
  default: vi.fn()
}))

import api from '../../utils/api'

import {
  asyncGetOwnProfile,
  asyncLogin,
  asyncRegister
} from './actions'

/**
 * Skenario pengujian untuk auth actions (async thunk)
 *
 * - asyncRegister
 *   - harus mengirim request POST ke endpoint /register dengan data pengguna
 *   - harus mengembalikan data pengguna ketika registrasi berhasil
 *   - harus menghasilkan rejected action ketika registrasi gagal
 *
 * - asyncLogin
 *   - harus mengirim request POST ke endpoint /login dengan email dan password
 *   - harus mengembalikan token ketika login berhasil
 *   - harus menghasilkan rejected action ketika login gagal
 *
 * - asyncGetOwnProfile
 *   - harus mengirim request GET ke endpoint /users/me dengan authorization token
 *   - harus mengembalikan data profil pengguna ketika berhasil
 *   - harus menghasilkan rejected action ketika pengambilan profil gagal
 */

describe('auth actions', () => {
  const dispatch = vi.fn()
  const getState = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('asyncRegister', () => {
    it('should send POST request to register endpoint', async () => {
      api.mockResolvedValue({
        data: {
          user: {
            id: 'user-1',
            name: 'Luky',
            email: 'luky@example.com'
          }
        }
      })

      await asyncRegister({
        name: 'Luky',
        email: 'luky@example.com',
        password: 'password123'
      })(dispatch, getState, undefined)

      expect(api).toHaveBeenCalledWith('/register', {
        method: 'POST',
        body: JSON.stringify({
          name: 'Luky',
          email: 'luky@example.com',
          password: 'password123'
        })
      })
    })

    it('should return user data when registration is successful', async () => {
      const user = {
        id: 'user-1',
        name: 'Luky',
        email: 'luky@example.com'
      }

      api.mockResolvedValue({
        data: { user }
      })

      const result = await asyncRegister({
        name: 'Luky',
        email: 'luky@example.com',
        password: 'password123'
      })(dispatch, getState, undefined)

      expect(result.type).toBe('auth/register/fulfilled')
      expect(result.payload).toEqual(user)
    })

    it('should return rejected action when registration fails', async () => {
      api.mockRejectedValue(new Error('Registrasi gagal'))

      const result = await asyncRegister({
        name: 'Luky',
        email: 'luky@example.com',
        password: 'password123'
      })(dispatch, getState, undefined)

      expect(result.type).toBe('auth/register/rejected')
      expect(result.error.message).toBe('Registrasi gagal')
    })
  })

  describe('asyncLogin', () => {
    it('should send POST request to login endpoint', async () => {
      api.mockResolvedValue({
        data: {
          token: 'token-login'
        }
      })

      await asyncLogin({
        email: 'luky@example.com',
        password: 'password123'
      })(dispatch, getState, undefined)

      expect(api).toHaveBeenCalledWith('/login', {
        method: 'POST',
        body: JSON.stringify({
          email: 'luky@example.com',
          password: 'password123'
        })
      })
    })

    it('should return token when login is successful', async () => {
      api.mockResolvedValue({
        data: {
          token: 'token-login'
        }
      })

      const result = await asyncLogin({
        email: 'luky@example.com',
        password: 'password123'
      })(dispatch, getState, undefined)

      expect(result.type).toBe('auth/login/fulfilled')
      expect(result.payload).toBe('token-login')
    })

    it('should return rejected action when login fails', async () => {
      api.mockRejectedValue(new Error('Login gagal'))

      const result = await asyncLogin({
        email: 'luky@example.com',
        password: 'password123'
      })(dispatch, getState, undefined)

      expect(result.type).toBe('auth/login/rejected')
      expect(result.error.message).toBe('Login gagal')
    })
  })

  describe('asyncGetOwnProfile', () => {
    it('should send GET request with authorization token', async () => {
      api.mockResolvedValue({
        data: {
          user: {
            id: 'user-1',
            name: 'Luky'
          }
        }
      })

      await asyncGetOwnProfile('token-login')(
        dispatch,
        getState,
        undefined
      )

      expect(api).toHaveBeenCalledWith('/users/me', {
        headers: {
          Authorization: 'Bearer token-login'
        }
      })
    })

    it('should return user profile when request is successful', async () => {
      const user = {
        id: 'user-1',
        name: 'Luky',
        email: 'luky@example.com'
      }

      api.mockResolvedValue({
        data: { user }
      })

      const result = await asyncGetOwnProfile('token-login')(
        dispatch,
        getState,
        undefined
      )

      expect(result.type).toBe('auth/getOwnProfile/fulfilled')
      expect(result.payload).toEqual(user)
    })

    it('should return rejected action when getting profile fails', async () => {
      api.mockRejectedValue(new Error('Gagal mengambil profil'))

      const result = await asyncGetOwnProfile('token-login')(
        dispatch,
        getState,
        undefined
      )

      expect(result.type).toBe('auth/getOwnProfile/rejected')
      expect(result.error.message).toBe('Gagal mengambil profil')
    })
  })
})
