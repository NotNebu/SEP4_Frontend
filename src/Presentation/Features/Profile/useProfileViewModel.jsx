import { useEffect, useState } from "react";

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

  useEffect(() => {
    fetch("https://localhost:5107/api/account/me", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    setProfile((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    await fetch("https://localhost:5107/api/account", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(profile),
    });
    alert("Profil opdateret.");
  };

  return {
    profile,
    loading,
    handleChange,
    handleSave,
  };
};
