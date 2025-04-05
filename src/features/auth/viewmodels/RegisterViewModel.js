
import { useState } from 'react'

export const RegisterViewModel = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    street: '',
    houseNumber: '',
    city: '',
    country: '',
    birthday: '',
  })

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value })
  }

  const onRegister = async () => {
    if (form.password !== form.confirmPassword) {
      alert("Passwords matcher ikke!")
      return
    }
  
    try {
      const response = await fetch("http://yarp-gateway:5107/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          username: form.username,
        })
      })
  
      if (!response.ok) {
        const err = await response.text()
        alert(`Registrering fejlede: ${err}`)
        return
      }
  
      alert("Bruger oprettet")
    } catch (error) {
      console.error("Register error:", error)
    }
  }  

  return { form, handleChange, onRegister }
}
