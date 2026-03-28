import React from 'react'
import AuthContent from '../components/Auth/AuthContent'
import UserLogin from '../components/Auth/UserLogin'

const Login = () => {
  return (
    <div className="flex flex-1 min-h-screen font-sans">

      <AuthContent />

      <UserLogin />

    </div>
  )
}

export default Login
