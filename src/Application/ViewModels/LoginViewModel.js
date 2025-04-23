import { useState } from 'react';
import { useAuth } from '@Shared/Context/AuthContext';

/**
 * ViewModel for login-funktionalitet.
 * Håndterer brugerinput og login-anmodningen til backend.
 *
 * @returns {{
 *   email: string,
 *   password: string,
 *   setEmail: function,
 *   setPassword: function,
 *   onLogin: function
 * }} Et objekt med tilstand og login-funktioner til brug i en loginformular
 */
export const LoginViewModel = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  // Henter login-funktion fra auth-kontekst
  const { login } = useAuth();  

  /**
   * Forsøger at logge brugeren ind via API'et.
   * Ved succes gemmes token via AuthContext.
   * Ved fejl vises alert eller console error.
   */
  const onLogin = async () => {
    try {
      const response = await fetch("http://yarp-gateway:5107/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      })
  
      if (!response.ok) {
        const err = await response.text()
        alert(`Login fejlede: ${err}`)
        return
      }
  
      const data = await response.json()
      
      login(data.token)  // Gem token i global auth-state
      console.log("Login success:", data)
      
    } catch (error) {
      console.error("Login error:", error)
    }
  }

  // Eksponerer relevant tilstand og funktioner til komponenter
  return {
    email,
    password,
    setEmail,
    setPassword,
    onLogin,
  }
}
