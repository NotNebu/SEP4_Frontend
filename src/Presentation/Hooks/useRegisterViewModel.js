import { useState } from "react";
import { registerUser } from "@/Application/Services/AuthService";

/**
 * RegisterViewModel – Håndterer state og validering for registreringsformularen.
 */
export const RegisterViewModel = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Opdaterer formularfelter
  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  // Forsøger at oprette en ny bruger
  const onRegister = async () => {
    if (form.password !== form.confirmPassword) {
      alert("Kodeordene matcher ikke!");
      return;
    }

    try {
      await registerUser({
        email: form.email,
        password: form.password,
        username: form.username,
      });

      alert("Bruger oprettet");
    } catch (error) {
      alert(error.message);
    }
  };

  return { form, handleChange, onRegister };
};
