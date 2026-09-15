import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

function LeaderboardPage () {
  return (
    <main className='min-h-screen bg-slate-50'>
      <div className='mx-auto max-w-5xl px-4 py-8 sm:px-6'>
        <Link
          to='/'
          className='inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700'
        >
          <ArrowLeft className='h-4.5 w-4.5' />
          Kembali ke forum
        </Link>

        <div className='mt-8 rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm'>
          <h1 className='text-3xl font-bold text-slate-900'>Leaderboard</h1>

          <p className='mt-3 text-slate-500'>Coming Soon</p>
        </div>
      </div>
    </main>
  )
}

export default LeaderboardPage
