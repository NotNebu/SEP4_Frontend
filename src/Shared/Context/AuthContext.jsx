import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // null = ikke logget ind, object = logget ind
  const [loading, setLoading] = useState(true); 

  /**
   * Henter brugerdata fra backend vha. JWT-cookie
   */
  const refreshUser = async () => {
    try {
      const response = await fetch("http://localhost:5107/api/auth/me", {
        method: "GET",
        credentials: "include", 
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error("Fejl ved hent af brugerinfo:", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Logger brugeren ud ved at rydde JWT-cookien på serveren
   */
  const logout = async () => {
    await fetch("http://localhost:5107/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
  };

  // Kør når appen loader, så vi tjekker login-status fra backend
  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, refreshUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook til at tilgå auth-konteksten.
 *
 * @returns {{ user: object|null, refreshUser: function, logout: function, loading: boolean }}
 */
export const useAuth = () => {
  return useContext(AuthContext);
};
