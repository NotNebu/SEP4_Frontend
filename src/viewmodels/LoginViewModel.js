
import { useState } from 'react'

export const LoginViewModel = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const onLogin = () => {
    // TODO we call an api later that alex is working on
  }

  return {
    email,
    password,
    setEmail,
    setPassword,
    onLogin,
  }
}
