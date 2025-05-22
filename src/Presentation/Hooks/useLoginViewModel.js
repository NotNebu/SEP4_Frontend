// src/Presentation/ViewModels/LoginViewModel.js

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@Shared/Context/AuthContext.jsx';
import { loginUser } from '@/Application/Services/AuthService';

export const LoginViewModel = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { refreshUser } = useAuth();

  const onLogin = async () => {
    try {
      if (!email) return alert("Email er påkrævet.");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return alert("Ugyldig email.");
      if (!password) return alert("Adgangskode er påkrævet.");
      if (password.length < 6) return alert("Adgangskoden skal være mindst 6 tegn.");

      await loginUser({ email, password });
      await refreshUser();
      navigate("/dashboard"); // ← her bruger du din destination
    } catch (error) {
      const msg = error?.message || "Login fejlede";
      alert(msg.toLowerCase().startsWith("login") ? msg : `Login fejlede: ${msg}`);
    }
  };

  return { email, password, setEmail, setPassword, onLogin };
};
