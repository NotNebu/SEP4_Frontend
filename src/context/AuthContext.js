import { createContext, useContext, useState } from 'react';

// Opretter en kontekst til autentificering
const AuthContext = createContext();

/**
 * AuthProvider-wrappet omkring din app håndterer global auth-tilstand.
 *
 * Gemmer og opdaterer JWT-token i state og localStorage.
 *
 * @component
 * @param {Object} props - Props sendt til komponenten
 * @param {React.ReactNode} props.children - Børn der skal have adgang til auth-konteksten
 * @returns {JSX.Element} Kontekstprovider for authentication
 */
export const AuthProvider = ({ children }) => {
  // Start med at hente token fra localStorage, hvis det findes
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  /**
   * Logger en bruger ind ved at gemme JWT-token
   * @param {string} newToken - JWT-token der skal gemmes
   */
  const login = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  /**
   * Logger brugeren ud ved at fjerne token fra både state og localStorage
   */
  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook til at tilgå auth-konteksten.
 * Bruges i komponenter som har brug for login-status, token eller logout-funktion.
 *
 * @returns {{ token: string|null, login: function, logout: function }}
 */
export const useAuth = () => {
  return useContext(AuthContext);
};
