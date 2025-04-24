import { useState } from 'react';
import { useAuth } from '@Shared/Context/AuthContext.jsx';
console.log("useAuth is", useAuth);

export const LoginViewModel = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { refreshUser } = useAuth(); 

  const onLogin = async () => {
    try {
      const response = await fetch("http://localhost:5107/api/auth/login", {
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
