import { createContext, useContext } from "react";
import { useAuthViewModel } from "@Presentation/ViewModels/useAuthViewModel";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const auth = useAuthViewModel();

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
