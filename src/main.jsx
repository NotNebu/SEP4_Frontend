import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'  // Importerer Tailwind-baseret global styling
import App from './App.jsx'  // Importerer hovedkomponenten

/**
 * Entry point for React-applikationen.
 * Opretter root og renderer <App /> inde i StrictMode, som hjælper med at finde potentielle fejl.
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
