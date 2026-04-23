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
        </div>
      </div>
    </div>
  )
   
}

export default LoginPage