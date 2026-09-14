import { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { asyncGetThreads } from '../states/threads/actions'
import { asyncGetUsers } from '../states/users/actions'
import formatDate from '../utils/formatDate'

function HomePage () {
  const dispatch = useDispatch()

  const {
    threads,
    isLoading: isLoadingThreads,
    error: errorThreads
  } = useSelector((state) => state.threads)

  const token = useSelector((state) => state.auth.token)

  const {
    users,
    isLoading: isLoadingUsers,
    error: errorUsers
  } = useSelector((state) => state.users)

  useEffect(() => {
    dispatch(asyncGetThreads())
    dispatch(asyncGetUsers())
  }, [dispatch])

  const isLoading = isLoadingThreads || isLoadingUsers

  const error = errorThreads || errorUsers

  if (isLoading) {
    return (
      <main className='mx-auto max-w-5xl p-6'>
        <p className='text-slate-500'>Loading...</p>
      </main>
    )
  }

  if (error) {
    return (
      <main className='mx-auto max-w-5xl p-6'>
        <p className='text-red-500'>{error}</p>
      </main>
    )
  }

  return (
    <main className='min-h-screen bg-slate-50'>
      <div className='mx-auto max-w-5xl px-4 py-8 sm:px-6'>
        {/* Header */}
        <section className='mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center'>
          <div>
            <h1 className='text-3xl font-bold text-slate-900'>
              Forum Discussion
            </h1>

            <p className='mt-2 text-slate-500'>
              Temukan dan bagikan berbagai diskusi menarik.
            </p>
          </div>

          <Link
            to={token ? '/create-thread' : '/login'}
            className='inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700'
          >
            + Buat Thread
          </Link>
        </section>

        {/* Thread List */}
        <div className='space-y-4'>
          {threads.map((thread) => {
            const owner = users.find((user) => user.id === thread.ownerId)
            return (
              <Link
                key={thread.id}
                to={`/threads/${thread.id}`}
                className='block'
              >
                <article className='rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md'>
                  <div className='mb-3 flex items-center gap-2'>
                    <span className='rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600'>
                      #{thread.category}
                    </span>

                    <time
                      dateTime={thread.createdAt}
                      className='text-xs text-slate-400'
                    >
                      {formatDate(thread.createdAt)}
                    </time>
                  </div>

                  <h2 className='text-xl font-semibold text-slate-900'>
                    {thread.title}
                  </h2>

                  <p className='mt-2 line-clamp-2 text-sm text-slate-600'>
                    {thread.body}
                  </p>

                  <div className='mt-4 flex items-center justify-between border-t border-slate-100 pt-4'>
                    <div className='flex items-center gap-3'>
                      {owner?.avatar
                        ? (
                          <img
                            src={owner.avatar}
                            alt={owner.name}
                            className='h-9 w-9 rounded-full object-cover'
                          />
                          )
                        : (
                          <div className='flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 text-sm font-semibold text-slate-600'>
                            {owner?.name?.charAt(0) ?? '?'}
                          </div>
                          )}

                      <div>
                        <p className='text-sm font-medium text-slate-800'>
                          {owner?.name ?? 'Unknown User'}
                        </p>

                        <p className='text-xs text-slate-400'>Pembuat thread</p>
                      </div>
                    </div>
                  </div>

                  <div className='mt-4 flex items-center justify-between text-sm text-slate-500'>
                    <span>{thread.totalComments} komentar</span>

                    <span>Lihat diskusi →</span>
                  </div>
                </article>
              </Link>
            )
          })}
        </div>
      </div>
    </main>
  )
}

export default HomePage
