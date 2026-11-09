import { describe, it, expect } from 'vitest'

import threadsReducer from './reducer'

import {
  asyncCreateComment,
  asyncCreateThread,
  asyncGetThreadDetail,
  asyncGetThreads
} from './actions'

/**
 * Skenario pengujian untuk threadsReducer
 *
 * - threadsReducer
 *   - harus mengembalikan initial state
 *
 * - asyncGetThreads
 *   - harus mengubah status loading menjadi true ketika proses dimulai
 *   - harus menyimpan daftar thread ketika berhasil
 *   - harus menyimpan pesan error ketika gagal
 *
 * - asyncGetThreadDetail
 *   - harus mengubah status loading detail menjadi true ketika proses dimulai
 *   - harus menghapus detail thread sebelumnya ketika proses dimulai
 *   - harus menyimpan detail thread ketika berhasil
 *   - harus menyimpan pesan error ketika gagal
 *
 * - asyncCreateThread
 *   - harus mengubah status pembuatan thread menjadi true ketika proses dimulai
 *   - harus menambahkan thread baru ke awal daftar thread ketika berhasil
 *   - harus mengisi owner dengan null pada thread baru
 *   - harus menyimpan pesan error ketika gagal
 *
 * - asyncCreateComment
 *   - harus mengubah status pembuatan komentar menjadi true ketika proses dimulai
 *   - harus menambahkan komentar baru ke detail thread ketika berhasil
 *   - harus menyimpan pesan error ketika gagal
 */

describe('threadsReducer', () => {
  it('should return initial state', () => {
    const state = threadsReducer(undefined, { type: 'unknown' })

    expect(state).toEqual({
      threads: [],
      detailThread: null,
      isLoading: false,
      isCreating: false,
      isCreateingComment: false,
      isDetailLoading: false,
      error: null,
      createError: null,
      detailError: null,
      commentError: null
    })
  })

  describe('asyncGetThreads', () => {
    it('should handle pending', () => {
      const state = threadsReducer(
        undefined,
        asyncGetThreads.pending('request-1')
      )

      expect(state.isLoading).toBe(true)
      expect(state.error).toBeNull()
    })

    it('should handle fulfilled', () => {
      const threads = [
        {
          id: 'thread-1',
          title: 'Belajar React',
          body: 'Diskusi React'
        },
        {
          id: 'thread-2',
          title: 'Belajar Redux',
          body: 'Diskusi Redux'
        }
      ]

      const state = threadsReducer(
        undefined,
        asyncGetThreads.fulfilled(threads, 'request-1')
      )

      expect(state.isLoading).toBe(false)
      expect(state.threads).toEqual(threads)
    })

    it('should handle rejected', () => {
      const state = threadsReducer(
        undefined,
        asyncGetThreads.rejected(
          new Error('Gagal mengambil daftar thread'),
          'request-1'
        )
      )

      expect(state.isLoading).toBe(false)
      expect(state.error).toBe('Gagal mengambil daftar thread')
    })
  })

  describe('asyncGetThreadDetail', () => {
    it('should handle pending', () => {
      const previousState = {
        detailThread: {
          id: 'thread-1',
          title: 'Thread sebelumnya'
        }
      }

      const state = threadsReducer(
        previousState,
        asyncGetThreadDetail.pending('request-1', 'thread-2')
      )

      expect(state.isDetailLoading).toBe(true)
      expect(state.detailError).toBeNull()
      expect(state.detailThread).toBeNull()
    })

    it('should handle fulfilled', () => {
      const detailThread = {
        id: 'thread-1',
        title: 'Belajar React',
        body: 'Diskusi React',
        comments: []
      }

      const state = threadsReducer(
        undefined,
        asyncGetThreadDetail.fulfilled(
          detailThread,
          'request-1',
          'thread-1'
        )
      )

      expect(state.isDetailLoading).toBe(false)
      expect(state.detailThread).toEqual(detailThread)
    })

    it('should handle rejected', () => {
      const state = threadsReducer(
        undefined,
        asyncGetThreadDetail.rejected(
          new Error('Gagal mengambil detail thread'),
          'request-1',
          'thread-1'
        )
      )

      expect(state.isDetailLoading).toBe(false)
      expect(state.detailError).toBe('Gagal mengambil detail thread')
    })
  })

  describe('asyncCreateThread', () => {
    it('should handle pending', () => {
      const state = threadsReducer(
        undefined,
        asyncCreateThread.pending('request-1', {})
      )

      expect(state.isCreating).toBe(true)
      expect(state.createError).toBeNull()
    })

    it('should handle fulfilled', () => {
      const newThread = {
        id: 'thread-2',
        title: 'Belajar Redux',
        body: 'Diskusi Redux'
      }

      const previousState = {
        threads: [
          {
            id: 'thread-1',
            title: 'Belajar React',
            body: 'Diskusi React',
            owner: null
          }
        ]
      }

      const state = threadsReducer(
        previousState,
        asyncCreateThread.fulfilled(newThread, 'request-1', {})
      )

      expect(state.isCreating).toBe(false)
      expect(state.threads).toHaveLength(2)
      expect(state.threads[0]).toEqual({
        ...newThread,
        owner: null
      })
      expect(state.threads[0].owner).toBeNull()
    })

    it('should handle rejected', () => {
      const state = threadsReducer(
        undefined,
        asyncCreateThread.rejected(
          new Error('Gagal membuat thread'),
          'request-1',
          {}
        )
      )

      expect(state.isCreating).toBe(false)
      expect(state.createError).toBe('Gagal membuat thread')
    })
  })

  describe('asyncCreateComment', () => {
    it('should handle pending', () => {
      const state = threadsReducer(
        undefined,
        asyncCreateComment.pending('request-1', {})
      )

      expect(state.isCreateingComment).toBe(true)
      expect(state.commentError).toBeNull()
    })

    it('should handle fulfilled', () => {
      const comment = {
        id: 'comment-1',
        content: 'Komentar baru',
        owner: {
          id: 'user-1',
          name: 'Luky'
        }
      }

      const previousState = {
        detailThread: {
          id: 'thread-1',
          title: 'Belajar React',
          comments: []
        }
      }

      const state = threadsReducer(
        previousState,
        asyncCreateComment.fulfilled(comment, 'request-1', {})
      )

      expect(state.isCreateingComment).toBe(false)
      expect(state.detailThread.comments).toHaveLength(1)
      expect(state.detailThread.comments[0]).toEqual(comment)
    })

    it('should handle rejected', () => {
      const state = threadsReducer(
        undefined,
        asyncCreateComment.rejected(
          new Error('Gagal membuat komentar'),
          'request-1',
          {}
        )
      )

      expect(state.isCreateingComment).toBe(false)
      expect(state.commentError).toBe('Gagal membuat komentar')
    })
  })
})
