import { useEffect, useState } from "react";
import {
  getMe,
  logout as logoutUser,
} from "@/Application/Services/AuthService";

/**
 * useAuthViewModel – Håndterer brugerens autentificeringstilstand (login-status).
 * Giver adgang til brugerdata, loading-status og logout-funktion.
 */
export const useAuthViewModel = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    try {
      const data = await getMe();
      setUser(data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
    } catch {
      alert("Log ud fejlede. Prøv igen.");
    } finally {
      setUser(null);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return { user, loading, refreshUser, logout };
};
