import { describe, it, expect, vi } from 'vitest'

import authReducer, { logout, setToken } from './reducer'

import {
  asyncGetOwnProfile,
  asyncLogin,
  asyncRegister
} from './actions'

vi.mock('../../utils/storage', () => ({
  getToken: vi.fn(() => null)
}))

/**
 * Skenario pengujian untuk authReducer
 *
 * - authReducer
 *   - harus mengembalikan initial state
 *
 * - setToken
 *   - harus memperbarui token
 *
 * - logout
 *   - harus menghapus token dan data pengguna
 *
 * - asyncRegister
 *   - harus menangani status pending
 *   - harus menangani status fulfilled
 *   - harus menangani status rejected
 *
 * - asyncLogin
 *   - harus menangani status pending
 *   - harus menangani status fulfilled
 *   - harus menangani status rejected
 *
 * - asyncGetOwnProfile
 *   - harus menangani status pending
 *   - harus menangani status fulfilled
 *   - harus menangani status rejected
 */

describe('authReducer', () => {
  it('should return initial state', () => {
    const state = authReducer(undefined, { type: 'unknown' })

    expect(state).toEqual({
      token: null,
      user: null,
      isLoading: false,
      isRegistering: false,
      isGettingProfile: false,
      error: null,
      registerError: null,
      profileError: null
    })
  })

  describe('setToken', () => {
    it('should update token', () => {
      const state = authReducer(undefined, setToken('token-baru'))

      expect(state.token).toBe('token-baru')
    })
  })

  describe('logout', () => {
    it('should clear token and user', () => {
      const previousState = {
        token: 'token-lama',
        user: { id: 'user-1', name: 'Luky' }
      }

      const state = authReducer(previousState, logout())

      expect(state.token).toBeNull()
      expect(state.user).toBeNull()
    })
  })

  describe('asyncRegister', () => {
    it('should handle pending', () => {
      const state = authReducer(
        undefined,
        asyncRegister.pending('request-1', {})
      )

      expect(state.isRegistering).toBe(true)
      expect(state.registerError).toBeNull()
    })

    it('should handle fulfilled', () => {
      const previousState = {
        isRegistering: true,
        registerError: null
      }

      const state = authReducer(
        previousState,
        asyncRegister.fulfilled({}, 'request-1', {})
      )

      expect(state.isRegistering).toBe(false)
    })

    it('should handle rejected', () => {
      const state = authReducer(
        undefined,
        asyncRegister.rejected(
          new Error('Registrasi gagal'),
          'request-1',
          {}
        )
      )

      expect(state.isRegistering).toBe(false)
      expect(state.registerError).toBe('Registrasi gagal')
    })
  })

  describe('asyncLogin', () => {
    it('should handle pending', () => {
      const state = authReducer(
        undefined,
        asyncLogin.pending('request-1', {})
      )

      expect(state.isLoading).toBe(true)
      expect(state.error).toBeNull()
    })

    it('should handle fulfilled', () => {
      const state = authReducer(
        undefined,
        asyncLogin.fulfilled('token-login', 'request-1', {})
      )

      expect(state.isLoading).toBe(false)
      expect(state.token).toBe('token-login')
    })

    it('should handle rejected', () => {
      const state = authReducer(
        undefined,
        asyncLogin.rejected(
          new Error('Login gagal'),
          'request-1',
          {}
        )
      )

      expect(state.isLoading).toBe(false)
      expect(state.error).toBe('Login gagal')
    })
  })

  describe('asyncGetOwnProfile', () => {
    it('should handle pending', () => {
      const state = authReducer(
        undefined,
        asyncGetOwnProfile.pending('request-1', undefined)
      )

      expect(state.isGettingProfile).toBe(true)
      expect(state.profileError).toBeNull()
    })

    it('should handle fulfilled', () => {
      const user = {
        id: 'user-1',
        name: 'Luky',
        email: 'luky@example.com'
      }

      const state = authReducer(
        undefined,
        asyncGetOwnProfile.fulfilled(user, 'request-1', undefined)
      )

      expect(state.isGettingProfile).toBe(false)
      expect(state.user).toEqual(user)
    })

    it('should handle rejected', () => {
      const state = authReducer(
        undefined,
        asyncGetOwnProfile.rejected(
          new Error('Gagal mengambil profil'),
          'request-1',
          undefined
        )
      )

      expect(state.isGettingProfile).toBe(false)
      expect(state.profileError).toBe('Gagal mengambil profil')
    })
  })
})
