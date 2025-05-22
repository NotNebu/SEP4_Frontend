import { useEffect, useState } from "react";
import { fetchUserProfile, updateUserProfile } from "@/Application/Services/AccountService";

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

  const [loading, setLoading] = useState(true);

  // Hent profilinfo
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

  //Håndter ændringer fra Input via name og value
  const handleChange = (name, value) => {
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      await updateUserProfile(profile);
      alert("Profil opdateret.");
    } catch (err) {
      console.error(err);
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