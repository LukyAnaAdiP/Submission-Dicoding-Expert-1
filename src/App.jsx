import { BrowserRouter, Route, Routes } from 'react-router-dom'

import AuthInitializer from './components/auth/AuthInitializer'
import HomePage from './pages/HomePage'
import ThreadDetailPage from './pages/ThreadDetailPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import Navbar from './components/layout/Navbar'
import ProtectedRoute from './components/auth/ProtectedRoute'
import CreateThreadPage from './pages/CreateThreadPage'

function App () {
  return (
    <BrowserRouter>
      <AuthInitializer>
        <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/threads/:threadId' element={<ThreadDetailPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route
            path='/create-thread'
            element={
              <ProtectedRoute>
                <CreateThreadPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthInitializer>
    </BrowserRouter>
  )
}

export default App
