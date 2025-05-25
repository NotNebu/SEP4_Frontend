import { createContext, useContext } from "react";
import { useAuthViewModel } from "@/Presentation/Hooks/useAuthViewModel";

export const AuthContext = createContext();

/**
 * AuthProvider – Wrapper som giver auth-state til resten af applikationen.
 */
export const AuthProvider = ({ children }) => {
  const auth = useAuthViewModel();

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * useAuth – Hook til at tilgå auth-konteksten i komponenter.
 */
export const useAuth = () => useContext(AuthContext);
