
import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('../../utils/api', () => ({
  default: vi.fn()
}))

vi.mock('../../utils/storage', () => ({
  getToken: vi.fn(() => 'token-test')
}))

import api from '../../utils/api'
import { getToken } from '../../utils/storage'

import {
  asyncCreateComment,
  asyncCreateThread,
  asyncGetThreadDetail,
  asyncGetThreads
} from './actions'

/**
 * Skenario pengujian untuk threads actions (async thunk)
 *
 * - asyncGetThreads
 *   - harus mengirim request GET ke endpoint /threads
 *   - harus mengembalikan daftar thread ketika berhasil
 *   - harus menghasilkan rejected action ketika gagal mengambil daftar thread
 *
 * - asyncGetThreadDetail
 *   - harus mengirim request GET ke endpoint detail thread berdasarkan ID
 *   - harus mengembalikan detail thread ketika berhasil
 *   - harus menghasilkan rejected action ketika gagal mengambil detail thread
 *
 * - asyncCreateThread
 *   - harus mengirim request POST ke endpoint /threads dengan token autentikasi
 *   - harus mengirim data judul, isi, dan kategori thread
 *   - harus mengembalikan data thread ketika berhasil dibuat
 *   - harus menghasilkan rejected action ketika gagal membuat thread
 *
 * - asyncCreateComment
 *   - harus mengirim request POST ke endpoint komentar dengan token autentikasi
 *   - harus mengirim isi komentar pada request body
 *   - harus mengembalikan data komentar ketika berhasil dibuat
 *   - harus menghasilkan rejected action ketika gagal membuat komentar
 */

describe('threads actions', () => {
  const dispatch = vi.fn()
  const getState = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('asyncGetThreads', () => {
    it('should send GET request to threads endpoint', async () => {
      api.mockResolvedValue({
        data: { threads: [] }
      })

      await asyncGetThreads()(dispatch, getState, undefined)

      expect(api).toHaveBeenCalledWith('/threads')
    })

    it('should return threads when request is successful', async () => {
      const threads = [
        {
          id: 'thread-1',
          title: 'Belajar React',
          body: 'Diskusi React'
        }
      ]

      api.mockResolvedValue({
        data: { threads }
      })

      const result = await asyncGetThreads()(
        dispatch,
        getState,
        undefined
      )

      expect(result.type).toBe('threads/getThreads/fulfilled')
      expect(result.payload).toEqual(threads)
    })

    it('should return rejected action when request fails', async () => {
      api.mockRejectedValue(new Error('Gagal mengambil daftar thread'))

      const result = await asyncGetThreads()(
        dispatch,
        getState,
        undefined
      )

      expect(result.type).toBe('threads/getThreads/rejected')
      expect(result.error.message).toBe('Gagal mengambil daftar thread')
    })
  })

  describe('asyncGetThreadDetail', () => {
    it('should send GET request to thread detail endpoint', async () => {
      api.mockResolvedValue({
        data: {
          detailThread: {}
        }
      })

      await asyncGetThreadDetail('thread-1')(
        dispatch,
        getState,
        undefined
      )

      expect(api).toHaveBeenCalledWith('/threads/thread-1')
    })

    it('should return thread detail when request is successful', async () => {
      const detailThread = {
        id: 'thread-1',
        title: 'Belajar React',
        body: 'Diskusi React',
        comments: []
      }

      api.mockResolvedValue({
        data: { detailThread }
      })

      const result = await asyncGetThreadDetail('thread-1')(
        dispatch,
        getState,
        undefined
      )

      expect(result.type).toBe('threads/getThreadDetail/fulfilled')
      expect(result.payload).toEqual(detailThread)
    })

    it('should return rejected action when request fails', async () => {
      api.mockRejectedValue(new Error('Gagal mengambil detail thread'))

      const result = await asyncGetThreadDetail('thread-1')(
        dispatch,
        getState,
        undefined
      )

      expect(result.type).toBe('threads/getThreadDetail/rejected')
      expect(result.error.message).toBe('Gagal mengambil detail thread')
    })
  })

  describe('asyncCreateThread', () => {
    it('should send POST request with authorization token', async () => {
      api.mockResolvedValue({
        data: {
          thread: {}
        }
      })

      await asyncCreateThread({
        title: 'Belajar Redux',
        body: 'Diskusi Redux',
        category: 'Programming'
      })(dispatch, getState, undefined)

      expect(getToken).toHaveBeenCalled()

      expect(api).toHaveBeenCalledWith('/threads', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer token-test'
        },
        body: JSON.stringify({
          title: 'Belajar Redux',
          body: 'Diskusi Redux',
          category: 'Programming'
        })
      })
    })

    it('should return thread when creation is successful', async () => {
      const thread = {
        id: 'thread-2',
        title: 'Belajar Redux',
        body: 'Diskusi Redux',
        category: 'Programming'
      }

      api.mockResolvedValue({
        data: { thread }
      })

      const result = await asyncCreateThread({
        title: 'Belajar Redux',
        body: 'Diskusi Redux',
        category: 'Programming'
      })(dispatch, getState, undefined)

      expect(result.type).toBe('threads/createThread/fulfilled')
      expect(result.payload).toEqual(thread)
    })

    it('should return rejected action when creation fails', async () => {
      api.mockRejectedValue(new Error('Gagal membuat thread'))

      const result = await asyncCreateThread({
        title: 'Belajar Redux',
        body: 'Diskusi Redux',
        category: 'Programming'
      })(dispatch, getState, undefined)

      expect(result.type).toBe('threads/createThread/rejected')
      expect(result.error.message).toBe('Gagal membuat thread')
    })
  })

  describe('asyncCreateComment', () => {
    it('should send POST request with authorization token', async () => {
      api.mockResolvedValue({
        data: {
          comment: {}
        }
      })

      await asyncCreateComment({
        threadId: 'thread-1',
        content: 'Komentar baru'
      })(dispatch, getState, undefined)

      expect(getToken).toHaveBeenCalled()

      expect(api).toHaveBeenCalledWith('/threads/thread-1/comments', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer token-test'
        },
        body: JSON.stringify({
          content: 'Komentar baru'
        })
      })
    })

    it('should return comment when creation is successful', async () => {
      const comment = {
        id: 'comment-1',
        content: 'Komentar baru',
        owner: {
          id: 'user-1',
          name: 'Luky'
        }
      }

      api.mockResolvedValue({
        data: { comment }
      })

      const result = await asyncCreateComment({
        threadId: 'thread-1',
        content: 'Komentar baru'
      })(dispatch, getState, undefined)

      expect(result.type).toBe('threads/createComment/fulfilled')
      expect(result.payload).toEqual(comment)
    })

    it('should return rejected action when creation fails', async () => {
      api.mockRejectedValue(new Error('Gagal membuat komentar'))

      const result = await asyncCreateComment({
        threadId: 'thread-1',
        content: 'Komentar baru'
      })(dispatch, getState, undefined)

      expect(result.type).toBe('threads/createComment/rejected')
      expect(result.error.message).toBe('Gagal membuat komentar')
    })
  })
})
