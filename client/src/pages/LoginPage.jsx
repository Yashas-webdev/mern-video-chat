import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuthStore from '../store/useAuthStore'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const login = useAuthStore(state => state.login)
  const isLoading = useAuthStore(state => state.isLoading)
  const error = useAuthStore(state => state.error)
  const user = useAuthStore(state => state.user)
  const clearError = useAuthStore(state => state.clearError)
  const navigate = useNavigate()

  useEffect(() => {
    if (user) navigate('/')
  }, [user, navigate])

  useEffect(() => {
    return () => clearError()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    await login(email, password)
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-9">
          <h1 className="text-4xl font-bold text-blue-500 mb-2">VideoChat</h1>
          <p className="text-gray-500 text-sm">Connect with anyone, anywhere</p>
        </div>

        {/* Card */}
        <div className="bg-gray-900 border border-gray-800 p-8 rounded-2xl shadow-2xl">
          <h2 className="text-white text-2xl font-bold mb-1">Welcome back</h2>
          <p className="text-gray-500 text-sm mb-6">Sign in to your account</p>

          {error && (
            <div className="bg-red-500 bg-opacity-10 border border-red-500 border-opacity-30 text-red-400 p-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-gray-400 text-xs font-medium mb-1.5 block uppercase tracking-wider">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 text-white p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-600"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="text-gray-600 text-xs font-medium mb-1.5 block uppercase tracking-wider">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 text-white p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-600"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold p-3 rounded-xl transition-all mt-2"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                  </svg>
                  Signing in...
                </span>
              ) : 'Sign In'}
            </button>
          </form>

          <p className="text-gray-600 text-center mt-6 text-sm">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage