import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { asyncGetThreads } from '../states/threads/actions'
import { asyncGetUsers } from '../states/users/actions'
import ThreadList from '../components/thread/ThreadList'
import { Link } from 'react-router-dom'
import { Pencil } from 'lucide-react'

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
            <Pencil className='h-4 w-4' />
            <span className='ml-2'>Buat Thread</span>
          </Link>
        </section>

        <ThreadList threads={threads} users={users} />
      </div>
    </main>
  )
}

export default HomePage
