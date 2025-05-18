import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@Shared/Context/AuthContext.jsx';
import { loginUser } from '@/Application/Services/AuthService';

/**
 * LoginViewModel – Håndterer loginformularens state og login-funktionalitet.
 */
export const LoginViewModel = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { refreshUser } = useAuth(); // Henter brugerdata efter login

  // Forsøger at logge brugeren ind
  const onLogin = async () => {
    try {
      await loginUser({ email, password });   // API-kald med login-oplysninger
      await refreshUser();                    // Opdater brugerdata i context
      
    } catch (error) {
      alert(`Login fejlede: ${error.message}`); 
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
