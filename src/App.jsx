import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'
import LoginPage from './features/auth/pages/LoginPage'

/**
 * Hovedkomponenten for applikationen.
 * Loader login-siden som startpunkt.
 *
 * @component
 * @returns {JSX.Element} Applikationens hovedkomponent
 */
function App() {
  return <LoginPage />
}

export default App
