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
    <div className='min-h-screen bg-gradient-to-br from-slate-100  via-blue-50 to-slate-100 flex items-center justify-center p-4'>

      {/* Card  */}
      <div className='w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden'>

        {/* Top accent bar */}
        <div className='h-1.5 bg-gardient-to-r from-blue-500 via-blue-600 to-blue-5000'/>

        <div className='p-10'>

          {/* Logo */}
          <div className='flex items-center gap-2 mb-8'>
            <div className='w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center'>
              <svg className='w-5 h-5 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d= "M15 10l4.553-2.069A1 1 0 0121 8.82v6.361a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
              </svg>
            </div>
            <span className='text-gray-900 font-bold text-xl'>VideoChat</span>
          </div>

          {/* Heading */}
          <div className='mb-8'>
            <h2 className='text-gray-900 text-2xl font-bold mb-1'>Sign in</h2>
            <p className='text-gray-400 text-sm'>Welcome back! Enter your details below.</p>
          </div>

          {/* Error */}
          {error && (
            <div className='bg-red-50 border border-red-100 text-red-500 p-3.5 rounded-xl mb-5 text-sm flex items-center gap-2'>
              <svg className='w-4 h-4 flex-shrink-0' fill='currentColor' viewBox='0 0 24 24'>
                <path d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.361a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
              </svg>
              {error}
            </div>
          )}


          {/* Form */}
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
              <label className='text-gray-600 text-sm font-medium mb-1.5 block'>
                Email address
              </label>
              <input 
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-full bg-gray-50 border border-gray-200 text-gray-900 p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all placeholder-gray-300 text-sm'
                placeholder='you@example.com'
                required
              />
            </div>

            <div>
              <label className='text-gray-600 text-sm font-medium mb-1.5 block'>
                Password
              </label>
              <input 
                type='password'
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                className='w-full bg-gray-50 border border-gray-200 text-gray-50--900  p-3.5 roundex-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all placeholder-gray-300 text-sm'
                placeholder='••••••••'
                required
              />
            </div>

            <button
               type='submit'
               disabled={isLoading}
               className='w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold p-3.5 rounded-xl transition-all text-sm mt-2'
            >
              {isLoading ? (
                <span className='flex items-center justify-center gap-2'>
                  <svg className='animate-spin h-4 w-4' viewBox='0 0 24 24' fill='none'>
                    <circle className='opacity-25' cx='12' r='12' r='10' stroke='currentColor' strokeWidth='4'/>
                    <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8v8z'/>
                  </svg>
                  Signing in...
                </span>
              ):'Sign In →'}
            </button>

            </form>
            
            {/* Divider */}
            <div className='flex items-center gap-3 my-6'>
              <div className='flex-1 h-px bg-gray-100'/>
              <span className='text-gray-300 text-xs'>or</span>
              <div className='flex-1 h-px bg-gray-100'/>  
            </div>

            <p className='text-gray-400 text-center text-sm'>
              Don't have an account?{' '}
              <Link to='/register' className='text-blue-600 hover:text-blue-700 font-semibold transiton-colors'>
              Create one free
              </Link>
            </p>

          
        </div>
      </div>

      {/* Botton tagline */}
      <p className='absolute bottom-6 text-gray-400 text-xs'>
        Secure • Peer-to-peer • No downloads required
      </p>
    </div>
  )
   
}

export default LoginPage