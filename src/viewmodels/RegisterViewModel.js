
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

  const onRegister = () => {
  // TODO: call AuthService
    if (form.password !== form.confirmPassword) {
      alert("Passwords don't match!")
      return
    }
  }

  return { form, handleChange, onRegister }
}
