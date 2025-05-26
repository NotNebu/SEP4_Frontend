import { useState } from "react";
import { registerUser } from "@/Application/Services/AuthService";

/**
 * RegisterViewModel – Håndterer formdata og validering i registreringsflow (f.eks. modal).
 * @param {Function} onSuccess – Callback ved succesfuld registrering (fx luk modal).
 */
export const RegisterViewModel = (onSuccess) => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const onRegister = async () => {
    if (!form.email || !form.username || !form.password) {
      alert("Alle felter skal udfyldes.");
      return;
    }

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

      alert("Din bruger er oprettet!");

      if (typeof onSuccess === "function") {
        onSuccess();
      }
    } catch (error) {
      alert("Forkert indtastede oplysninger. Prøv igen.");
    }
  };

  return {
    form,
    handleChange,
    onRegister,
  };
};
