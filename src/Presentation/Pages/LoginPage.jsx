import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginViewModel } from "@/Presentation/Hooks/useLoginViewModel";
import { useAuth } from "@Shared/Context/AuthContext.jsx";

import LoginForm from "@/Presentation/Components/Auth/LoginForm.jsx";
import RegisterModal from "@/Presentation/Components/Auth/RegisterModal.jsx";
import AuthBackground from "@/Presentation/Components/Auth/AuthBackground.jsx";
import Card from "@/Presentation/Components/Shared/UI/Card.jsx";

import logo from "@/assets/GroWheatLogo.png";

/**
 * LoginPage – Siden hvor brugeren logger ind, og evt. kan åbne registreringsmodal.
 */
export default function LoginPage() {
  const { email, password, setEmail, setPassword, onLogin } = LoginViewModel();
  const [showRegister, setShowRegister] = useState(false);

  const { user } = useAuth();
  const navigate = useNavigate();

  // Hvis bruger allerede er logget ind, send dem til forsiden
  useEffect(() => {
    if (user) navigate("/");
  }, [user]);

  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center px-4 bg-black">
      {/* Animeret baggrund */}
      <AuthBackground />

      {/* Logo */}
      <div className="z-10 mt-8 mb-6 w-full text-center">
        <img
          src={logo}
          alt="GroWheat Logo"
          className="mx-auto opacity-90 drop-shadow-xl w-48 sm:w-64 md:w-80"
        />
      </div>

      {/* Login-kort */}
      <div className="z-10 w-full max-w-[90vw] sm:max-w-md md:max-w-lg">
        <Card variant="auth" className="text-white space-y-6 p-10">
          <h2 className="text-3xl font-bold text-center">Login</h2>

          {/* Loginformular */}
          <LoginForm
            email={email}
            password={password}
            setEmail={setEmail}
            setPassword={setPassword}
            onLogin={onLogin}
          />

          {/* Link til registrering */}
          <p className="text-sm text-center text-gray-300">
            Har du ikke en konto?{" "}
            <span
              className="text-white hover:underline cursor-pointer"
              onClick={() => setShowRegister(true)}
            >
              Registrér
            </span>
          </p>
        </Card>
      </div>

      {/* Registreringsmodal */}
      {showRegister && <RegisterModal onClose={() => setShowRegister(false)} />}
    </div>
  );
}
