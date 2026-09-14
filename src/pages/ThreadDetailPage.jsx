import { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

import CommentList from '../components/comment/CommentList'
import {
  asyncGetThreadDetail,
  asyncCreateComment
} from '../states/threads/actions'
import formatDate from '../utils/formatDate'

function ThreadDetailPage () {
  const { threadId } = useParams()
  const dispatch = useDispatch()
  const [content, setContent] = useState('')

  const {
    detailThread,
    isDetailLoading,
    isCreatingComment,
    detailError,
    commentError
  } = useSelector((state) => state.threads)

  const token = useSelector((state) => state.auth.token)

  const handleSubmitComment = async (event) => {
    event.preventDefault()

    if (!content.trim()) {
      return
    }

    const resultAction = await dispatch(
      asyncCreateComment({
        threadId,
        content: content.trim()
      })
    )

    if (asyncCreateComment.fulfilled.match(resultAction)) {
      setContent('')
    }
  }

  useEffect(() => {
    dispatch(asyncGetThreadDetail(threadId))
  }, [dispatch, threadId])

  if (isDetailLoading) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <p className='text-slate-500'>Loading thread...</p>
      </div>
    )
  }

  if (detailError) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <p className='text-red-500'>{detailError}</p>
      </div>
    )
  }

  if (!detailThread) {
    return null
  }

  return (
    <main className='min-h-screen bg-slate-50'>
      <div className='mx-auto max-w-4xl px-4 py-8 sm:px-6'>
        <Link
          to='/'
          className='mb-6 inline-flex text-sm font-medium text-blue-600 hover:text-blue-700'
        >
          ← Kembali ke forum
        </Link>

        <article className='rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8'>
          <div className='flex flex-wrap items-center justify-between gap-3'>
            <span className='rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600'>
              #{detailThread.category}
            </span>

            <time
              dateTime={detailThread.createdAt}
              className='text-sm text-slate-400'
            >
              {formatDate(detailThread.createdAt)}
            </time>
          </div>

          <h1 className='mt-5 text-3xl font-bold leading-tight text-slate-900'>
            {detailThread.title}
          </h1>

          <div className='mt-5 flex items-center gap-3'>
            {detailThread.owner?.avatar
              ? (
                <img
                  src={detailThread.owner.avatar}
                  alt={detailThread.owner.name}
                  className='h-11 w-11 rounded-full object-cover'
                />
                )
              : (
                <div className='flex h-11 w-11 items-center justify-center rounded-full bg-slate-200 font-semibold text-slate-600'>
                  {detailThread.owner?.name?.charAt(0) ?? '?'}
                </div>
                )}

            <div>
              <p className='font-semibold text-slate-800'>
                {detailThread.owner?.name ?? 'Unknown User'}
              </p>

              <p className='text-xs text-slate-400'>Pembuat thread</p>
            </div>
          </div>

          <div className='mt-8 border-t border-slate-100 pt-6'>
            <p className='whitespace-pre-wrap leading-7 text-slate-700'>
              {detailThread.body}
            </p>
          </div>
        </article>

        <section className='mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8'>
          <h2 className='text-xl font-bold text-slate-900'>
            Komentar ({detailThread.comments.length})
          </h2>

          {token
            ? (
              <form onSubmit={handleSubmitComment} className='mt-6'>
                <label
                  htmlFor='comment'
                  className='mb-2 block text-sm font-medium text-slate-700'
                >
                  Tulis komentar
                </label>

                <textarea
                  id='comment'
                  value={content}
                  onChange={(event) => setContent(event.target.value)}
                  placeholder='Tulis komentar kamu...'
                  rows={4}
                  className='w-full resize-none rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
                />

                {commentError && (
                  <p className='mt-2 text-sm text-red-500'>{commentError}</p>
                )}

                <div className='mt-3 flex justify-end'>
                  <button
                    type='submit'
                    disabled={isCreatingComment || !content.trim()}
                    className='rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50'
                  >
                    {isCreatingComment ? 'Mengirim...' : 'Kirim Komentar'}
                  </button>
                </div>
              </form>
              )
            : (
              <div className='mt-6 rounded-lg bg-slate-50 p-4'>
                <p className='text-sm text-slate-600'>
                  Silakan login untuk memberikan komentar.
                </p>

                <Link
                  to='/login'
                  className='mt-3 inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700'
                >
                  Login
                </Link>
              </div>
              )}

          <CommentList comments={detailThread.comments} />
        </section>
      </div>
    </main>
  )
}

export default ThreadDetailPage
