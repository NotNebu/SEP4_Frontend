import { useState } from 'react'
import { LoginViewModel } from '../viewmodels/LoginViewModel'
import { FaUser, FaLock } from 'react-icons/fa'
import RegisterModal from '../../../components/RegisterModal'

const LoginPage = () => {
  const { email, password, setEmail, setPassword, onLogin } = LoginViewModel()

  const [showRegister, setShowRegister] = useState(false)

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center px-4 bg-black">
      {/* Glowing BG */}
      <div className="absolute inset-0 z-0">
        <div className="absolute w-full h-full bg-gradient-to-br from-pink-500/20 via-black to-blue-500/20 blur-sm animate-pulse"></div>
        <div className="absolute inset-0 bg-[radial-gradient(white_1px,transparent_1px)] [background-size:30px_30px] opacity-10"></div>
      </div>

      {/* Login Card */}
      <div className="z-10 backdrop-blur-md bg-white/10 border border-white/20 rounded-xl shadow-2xl p-10 w-full max-w-md space-y-6 text-white">
        <h2 className="text-3xl font-bold text-center">Login</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            onLogin()
          }}
          className="space-y-4"
        >
          {/* Username */}
          <div className="relative">
            <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-white text-sm" />
            <input
              type="text"
              placeholder="Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full bg-white/10 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-white text-sm" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full bg-white/10 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition"
          >
            Login
          </button>
        </form>

        {/* Register Link */}
        <p className="text-sm text-center text-gray-300">
          Don’t have an account?{' '}
          <span
            className="text-white hover:underline cursor-pointer"
            onClick={() => setShowRegister(true)}
          >
            Register
          </span>
        </p>
      </div>

      {/* Register Modal */}
      {showRegister && <RegisterModal onClose={() => setShowRegister(false)} />}
    </div>
  )
}

export default LoginPage
