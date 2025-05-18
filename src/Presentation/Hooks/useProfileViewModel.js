import { useEffect, useState } from "react";
import { fetchUserProfile, updateUserProfile } from "@/Application/Services/ProfileService";

/**
 * useProfileViewModel – Håndterer visning og opdatering af brugerens profiloplysninger.
 */
export const useProfileViewModel = () => {
  const [profile, setProfile] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    birthday: "",
    country: "",
    street: "",
    houseNumber: "",
    city: "",
  });

  const [loading, setLoading] = useState(true); // Vises indtil profil er hentet

  // Hent profilinfo ved første indlæsning
  useEffect(() => {
    fetchUserProfile()
      .then((data) => {
        setProfile(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Opdaterer felt i profilen
  const handleChange = (e) => {
    setProfile((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Gem ændringer til profilen
  const handleSave = async () => {
    try {
      await updateUserProfile(profile);
      alert("Profil opdateret.");
    } catch (err) {
      alert("Noget gik galt.");
    }
  };

  return {
    profile,
    loading,
    handleChange,
    handleSave,
  };
};
