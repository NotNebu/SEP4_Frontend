import { RegisterViewModel } from '@/Presentation/Features/Login/useRegisterViewModel';
import { IoClose } from 'react-icons/io5';

/**
 * Modal-komponent til registrering af ny bruger.
 * Indeholder en forenklet formular med kun username, email, og password.
 *
 * @component
 * @param {Object} props - Komponentens props
 * @param {function} props.onClose - Funktion som lukker modalvinduet
 * @returns {JSX.Element} Registreringsmodal med de nødvendige formularfelter
 */
const RegisterModal = ({ onClose }) => {
  const { form, handleChange, onRegister } = RegisterViewModel();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="relative w-full max-w-md bg-white/10 backdrop-blur-lg p-8 rounded-xl text-white shadow-2xl">
        
        {/* Luk-knap i øverste hjørne */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300"
        >
          <IoClose size={20} />
        </button>

        <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>

        {/* Registreringsformular */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onRegister();
          }}
          className="space-y-4"
        >
          {/* Username */}
          <div className="flex flex-col space-y-1">
            <label htmlFor="username" className="text-sm text-gray-200">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={form.username}
              onChange={(e) => handleChange('username', e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col space-y-1">
            <label htmlFor="email" className="text-sm text-gray-200">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col space-y-1">
            <label htmlFor="password" className="text-sm text-gray-200">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={form.password}
              onChange={(e) => handleChange('password', e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col space-y-1">
            <label htmlFor="confirmPassword" className="text-sm text-gray-200">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={(e) => handleChange('confirmPassword', e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit-knap */}
          <button
            type="submit"
            className="w-full py-2 bg-white text-black font-semibold rounded-md hover:bg-gray-200 transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;
