import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@Shared/Context/AuthContext.jsx";
import { loginUser } from "@/Application/Services/AuthService";

// Hook til håndtering af login-logik
// Indeholder state for email og adgangskode samt validering og navigation
export const LoginViewModel = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { refreshUser } = useAuth();

  // Håndterer login med validering og navigation
  const onLogin = async () => {
    try {
      if (!email) return alert("Email er påkrævet.");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
        return alert("Ugyldig email.");
      if (!password) return alert("Adgangskode er påkrævet.");
      if (password.length < 6)
        return alert("Adgangskoden skal være mindst 6 tegn.");

      await loginUser({ email, password });
      await refreshUser();
      navigate("/dashboard");
    } catch (error) {
      const msg = error?.message || "Login fejlede";
      alert("Login Fejlede");
    }
  };

  return { email, password, setEmail, setPassword, onLogin };
};
