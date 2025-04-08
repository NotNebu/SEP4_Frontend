import { useState } from 'react'
import { useAuth } from '../context/AuthContext' 

export const LoginViewModel = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { login } = useAuth();  

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
      
      login(data.token)  
      console.log("Login success:", data)
      
    } catch (error) {
      console.error("Login error:", error)
    }
  }

  return {
    email,
    password,
    setEmail,
    setPassword,
    onLogin,
  }
}