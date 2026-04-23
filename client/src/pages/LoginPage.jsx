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

        
      </div>
    </div>
  )
   
}

export default LoginPage