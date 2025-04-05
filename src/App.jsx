import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'
import LoginPage from './pages/LoginPage'

function App() {
  return <LoginPage />
}

/* function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">Tailwind is Working 🎉</h1>
      <button
        className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={() => setCount((count) => count + 1)}
      >
        Count is {count}
      </button>
    </div>
  )
}   */

export default App
