import { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { asyncLogin, asyncGetOwnProfile } from '../states/auth/actions'
import { putToken } from '../utils/storage'

function LoginPage () {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {
    isLoading,
    error
  } = useSelector((state) => state.auth)

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((current) => ({
      ...current,
      [name]: value
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const resultAction = await dispatch(asyncLogin(formData))

    if (asyncLogin.fulfilled.match(resultAction)) {
      const token = resultAction.payload

      putToken(token)

      const profileAction = await dispatch(
        asyncGetOwnProfile(token)
      )

      if (asyncGetOwnProfile.fulfilled.match(profileAction)) {
        navigate('/')
      }
    }
  }

  return (
    <main className='flex min-h-screen items-center justify-center bg-slate-50 px-4 py-8'>
      <div className='w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8'>
        <div className='mb-8'>
          <h1 className='text-2xl font-bold text-slate-900'>
            Login
          </h1>

          <p className='mt-2 text-sm text-slate-500'>
            Masuk untuk melanjutkan ke forum.
          </p>
        </div>

        {error && (
          <div className='mb-5 rounded-lg bg-red-50 p-3 text-sm text-red-600'>
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className='space-y-5'
        >
          <div>
            <label
              htmlFor='email'
              className='mb-2 block text-sm font-medium text-slate-700'
            >
              Email
            </label>

            <input
              id='email'
              name='email'
              type='email'
              value={formData.email}
              onChange={handleChange}
              required
              className='w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
              placeholder='nama@email.com'
            />
          </div>

          <div>
            <label
              htmlFor='password'
              className='mb-2 block text-sm font-medium text-slate-700'
            >
              Password
            </label>

            <input
              id='password'
              name='password'
              type='password'
              value={formData.password}
              onChange={handleChange}
              required
              className='w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
              placeholder='Password'
            />
          </div>

          <button
            type='submit'
            disabled={isLoading}
            className='w-full rounded-lg bg-slate-900 px-4 py-2.5 font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50'
          >
            {isLoading ? 'Memproses...' : 'Login'}
          </button>
        </form>

        <p className='mt-6 text-center text-sm text-slate-500'>
          Belum punya akun?{' '}
          <Link
            to='/register'
            className='font-medium text-blue-600 hover:text-blue-700'
          >
            Daftar
          </Link>
        </p>
      </div>
    </main>
  )
}

export default LoginPage
