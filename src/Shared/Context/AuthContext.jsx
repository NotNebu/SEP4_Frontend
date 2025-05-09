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
      const response = await fetch("https://localhost:5107/api/auth/me", {
        method: "GET",
        credentials: "include",
      });
  
      console.log("Response status:", response.status); 
  
      if (response.ok) {
        const data = await response.json();
        console.log("Bruger data:", data); 
        setUser(data);
      } else {
        const errorText = await response.text();
        console.warn("Fejl ved /me:", errorText);
        setUser(null);
      }
    } catch (err) {
      console.error("Exception i refreshUser:", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };  

  /**
   * Logger brugeren ud ved at rydde JWT-cookien på serveren
   */
  const logout = async () => {
    await fetch("https://localhost:5107/api/auth/logout", {
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
