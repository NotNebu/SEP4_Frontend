import { useAuth } from "@Shared/Context/AuthContext";
import ProfileForm from "@Presentation/Components/ProfileForm";
import ProfileSidebar from "@Presentation/Components/ProfileSidebar";
import ExperimentsSidebar from "@Presentation/Components/ExperimentsSidebar";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const { user, loading } = useAuth();
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

  useEffect(() => {
    fetch("https://localhost:5107/api/account/me", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then(setProfile)
      .catch(console.error);
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
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

  if (loading) return <p className="text-white">Loader...</p>;
  if (!user) return <p className="text-red-500">Du er ikke logget ind.</p>;

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ProfileForm profile={profile} onChange={handleChange} />
        </div>
        <div className="space-y-6">
          <ProfileSidebar onSave={handleSave} />
          <ExperimentsSidebar />
        </div>
      </div>
    </div>
  );
}

