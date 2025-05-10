import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useAuth } from '@Shared/Context/AuthContext.jsx';

export const LoginViewModel = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { refreshUser } = useAuth(); 

  const onLogin = async () => {
    try {
      const response = await fetch("https://localhost:5107/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if (!response.ok) {
        const err = await response.text();
        alert(`Login fejlede: ${err}`);
        return;
      }

      await refreshUser(); 
      console.log("Login successful");
      navigate("/profile");

    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return {
    email,
    password,
    setEmail,
    setPassword,
    onLogin,
  };
};
