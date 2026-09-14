import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink, useNavigate } from 'react-router-dom'

import { logout } from '../../states/auth/reducer'
import { removeToken } from '../../utils/storage'

function Navbar () {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { token, user } = useSelector((state) => state.auth)

  const handleLogout = () => {
    dispatch(logout())
    removeToken()
    navigate('/')
  }

  const getNavLinkClass = ({ isActive }) => (
    `text-sm font-medium transition ${
      isActive
        ? 'text-blue-600'
        : 'text-slate-600 hover:text-blue-600'
    }`
  )

  return (
    <header className='sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur'>
      <nav className='mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6'>
        <Link
          to='/'
          className='text-xl font-bold text-slate-900'
        >
          Forumly
        </Link>

        <div className='flex items-center gap-5'>
          <NavLink
            to='/'
            className={getNavLinkClass}
          >
            Home
          </NavLink>

          <NavLink
            to='/leaderboard'
            className={getNavLinkClass}
          >
            Leaderboard
          </NavLink>

          {token
            ? (
              <>
                <div className='flex items-center gap-2'>
                  {user?.avatar
                    ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className='h-8 w-8 rounded-full object-cover'
                      />
                      )
                    : (
                      <div className='flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-sm font-semibold text-slate-600'>
                        {user?.name?.charAt(0) ?? '?'}
                      </div>
                      )}

                  <span className='hidden text-sm font-medium text-slate-700 md:block'>
                    {user?.name ?? 'User'}
                  </span>
                </div>

                <button
                  type='button'
                  onClick={handleLogout}
                  className='text-sm font-medium text-red-500 transition hover:text-red-600'
                >
                  Logout
                </button>
              </>
              )
            : (
              <>
                <NavLink
                  to='/login'
                  className={getNavLinkClass}
                >
                  Login
                </NavLink>

                <NavLink
                  to='/register'
                  className='rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800'
                >
                  Daftar
                </NavLink>
              </>
              )}
        </div>
      </nav>
    </header>
  )
}

export default Navbar
