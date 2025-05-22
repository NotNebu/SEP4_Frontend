// useProfileViewModel.js
import { useEffect, useState } from "react";
import { fetchUserProfile, updateUserProfile } from "@/Application/Services/AccountService";

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
<<<<<<< Updated upstream

  // Hent profilinfo
=======
  const [error, setError] = useState(""); 

>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
  //Håndter ændringer fra Input via name og value
  const handleChange = (name, value) => {
    setProfile((prev) => ({
      ...prev,
      [name]: value,
=======
  const handleChange = (field, value) => {
    setError(""); // ryd fejl ved ny input
    setProfile((prev) => ({
      ...prev,
      [field]: value,
>>>>>>> Stashed changes
    }));
  };

  const handleSave = async () => {
    try {
      await updateUserProfile(profile);
      setError(""); // ryd fejl
      alert("Profil opdateret.");
    } catch (err) {
<<<<<<< Updated upstream
      console.error(err);
      alert("Noget gik galt.");
=======
      const message = err?.message || "Noget gik galt.";
      setError(message);
>>>>>>> Stashed changes
    }
  };

  return {
    profile,
    loading,
    handleChange,
    handleSave,
    error, 
  };
};
