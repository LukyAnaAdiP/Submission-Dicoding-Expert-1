import { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { asyncRegister } from '../states/auth/actions'

function RegisterPage () {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {
    isRegistering,
    registerError
  } = useSelector((state) => state.auth)

  const [formData, setFormData] = useState({
    name: '',
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

    const resultAction = await dispatch(asyncRegister(formData))

    if (asyncRegister.fulfilled.match(resultAction)) {
      navigate('/login')
    }
  }

  return (
    <main className='flex min-h-screen items-center justify-center bg-slate-50 px-4 py-8'>
      <div className='w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8'>
        <div className='mb-8'>
          <h1 className='text-2xl font-bold text-slate-900'>
            Buat Akun
          </h1>

          <p className='mt-2 text-sm text-slate-500'>
            Daftar untuk mulai bergabung dalam diskusi.
          </p>
        </div>

        {registerError && (
          <div className='mb-5 rounded-lg bg-red-50 p-3 text-sm text-red-600'>
            {registerError}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className='space-y-5'
        >
          <div>
            <label
              htmlFor='name'
              className='mb-2 block text-sm font-medium text-slate-700'
            >
              Nama
            </label>

            <input
              id='name'
              name='name'
              type='text'
              value={formData.name}
              onChange={handleChange}
              required
              className='w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
              placeholder='Nama kamu'
            />
          </div>

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
              minLength={6}
              required
              className='w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
              placeholder='Minimal 6 karakter'
            />
          </div>

          <button
            type='submit'
            disabled={isRegistering}
            className='w-full rounded-lg bg-slate-900 px-4 py-2.5 font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50'
          >
            {isRegistering ? 'Mendaftarkan...' : 'Daftar'}
          </button>
        </form>

        <p className='mt-6 text-center text-sm text-slate-500'>
          Sudah punya akun?{' '}
          <Link
            to='/login'
            className='font-medium text-blue-600 hover:text-blue-700'
          >
            Login
          </Link>
        </p>
      </div>
    </main>
  )
}

export default RegisterPage
