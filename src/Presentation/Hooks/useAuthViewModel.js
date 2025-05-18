import { useEffect, useState } from "react";
import * as AuthService from "@Infrastructure/API/auth";

/**
 * useAuthViewModel – Håndterer brugerens autentificeringstilstand (login-status).
 * Giver adgang til brugerdata, loading-status og logout-funktion.
 */
export const useAuthViewModel = () => {
  const [user, setUser] = useState(null);     // Gemmer nuværende bruger
  const [loading, setLoading] = useState(true); // Viser om brugerdata hentes

  // Henter information om den aktuelle bruger
  const refreshUser = async () => {
    try {
      const data = await AuthService.getMe();
      console.log("Bruger data:", data);
      setUser(data);
    } catch (err) {
      console.warn("Fejl ved /me:", err.message);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Logger brugeren ud
  const logout = async () => {
    try {
      await AuthService.logout();
    } catch (err) {
      console.error("Logout-fejl:", err.message);
    } finally {
      setUser(null);
    }
  };

  // Hent brugerdata ved første load
  useEffect(() => {
    refreshUser();
  }, []);

  return { user, loading, refreshUser, logout };
};
