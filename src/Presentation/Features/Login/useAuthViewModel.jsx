import { useEffect, useState } from "react";
import * as AuthService from "@Infrastructure/Services/auth"; 

export const useAuthViewModel = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const logout = async () => {
    try {
      await AuthService.logout();
    } catch (err) {
      console.error("Logout-fejl:", err.message);
    } finally {
      setUser(null);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return { user, loading, refreshUser, logout };
};
