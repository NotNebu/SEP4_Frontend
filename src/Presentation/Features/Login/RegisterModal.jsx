import { RegisterViewModel } from '@/Presentation/Features/Login/useRegisterViewModel';
import { IoClose } from 'react-icons/io5';

/**
 * Modal-komponent til registrering af ny bruger.
 *
 * Indeholder en formular med dynamisk genererede felter og understøtter lukning via `onClose`.
 *
 * @component
 * @param {Object} props - Komponentens props
 * @param {function} props.onClose - Funktion som lukker modalvinduet
 * @returns {JSX.Element} Registreringsmodal med formularfelter
 */
const RegisterModal = ({ onClose }) => {
  const { form, handleChange, onRegister } = RegisterViewModel()

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
            e.preventDefault()
            onRegister()
          }}
          className="space-y-4"
        >
          {[
            { label: 'First Name', field: 'firstName' },
            { label: 'Last Name', field: 'lastName' },
            { label: 'Username', field: 'username' },
            { label: 'Email', field: 'email' },
            { label: 'Password', field: 'password', type: 'password' },
            { label: 'Confirm Password', field: 'confirmPassword', type: 'password' },
            { label: 'Street', field: 'street' },
            { label: 'House Number', field: 'houseNumber' },
            { label: 'City', field: 'city' },
            { label: 'Country', field: 'country' },
            { label: 'Birthday', field: 'birthday', type: 'date' }
          ].map(({ label, field, type = 'text' }) => (
            <div key={field} className="flex flex-col space-y-1">
              <label htmlFor={field} className="text-sm text-gray-200">
                {label}
              </label>
              <input
                id={field}
                type={type}
                value={form[field]}
                onChange={(e) => handleChange(field, e.target.value)}
                className={`w-full px-4 py-2 rounded-md bg-white/10 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${type === 'date' ? 'text-gray-200' : ''}`}
              />
            </div>
          ))}

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
  )
}

export default RegisterModal
