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
   // Alert Validering af email
    if (!email) {
      alert("Email er påkrævet.");
      return;
    }

     // Tjek om email er gyldigt format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Indtast en gyldig emailadresse (f.eks. test@email.com).");
      return;
    }

    // Alert Validering af adgangskode
    if (!password) {
      alert("Adgangskode er påkrævet.");
      return;
    }

    // Validering af adgangskode længde
    if (password.length < 6) {
      alert("Adgangskoden skal være mindst 6 tegn lang.");
      return;
    }
      // Validering af email og adgangskode
      await loginUser({ email, password });   // API-kald med login-oplysninger
      await refreshUser();                    // Opdater brugerdata i context
        } catch (error) {
    const msg = error?.message || "Login fejlede";

     // Hvis den allerede starter med "Login", vis bare beskeden direkte
    if (msg.toLowerCase().startsWith("login")) {
      alert(msg);
    } else {
      alert(`Login fejlede: ${msg}`);
    }
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
