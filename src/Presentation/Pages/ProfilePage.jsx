import { useAuth } from "@Shared/Context/AuthContext";
import ProfileForm from "@/Presentation/Components/Profile/ProfileForm";
import ProfileSidebar from "@/Presentation/Components/Profile/ProfileSidebar";
import ExperimentsSidebar from "@/Presentation/Components/Experiments/ExperimentsSidebar";
import { useProfileViewModel } from "@/Presentation/Hooks/useProfileViewModel";
import Footer from "@/Presentation/Layout/Footer/Footer";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

/**
 * ProfilePage – Viser brugerens profiloplysninger og eksperimenter.
 * Giver mulighed for at ændre data, uploade profilbillede og skifte kodeord.
 */
export default function ProfilePage() {
  const { user, loading: authLoading } = useAuth();
  const { profile, loading, handleChange, handleSave, error } = useProfileViewModel();
  const location = useLocation();
  const [showExperiments, setShowExperiments] = useState(false);

  // Hvis navigation kommer fra fx "Mine eksperimenter" → åben modal
  useEffect(() => {
    if (location.state?.showExperiments) {
      setShowExperiments(true);
      window.history.replaceState({}, document.title); // undgå auto-åbning ved refresh
    }
  }, [location.state]);

  // Loading-tilstand
  if (authLoading || loading)
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-white text-lg">Loader...</p>
      </div>
    );

  // Hvis ikke logget ind
  if (!user)
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-red-500 text-lg">Du er ikke logget ind.</p>
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <main className="flex-grow p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">Min Profil</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Venstreside: Profilformular */}
            <div className="lg:col-span-2">
              <div className="bg-gray-800 p-6 rounded-xl shadow-xl transition-shadow hover:shadow-2xl">
                <ProfileForm profile={profile} onChange={handleChange} error={error} />
              </div>
            </div>

            {/* Højreside: Sidepaneler */}
            <div className="space-y-6">
              <div className="bg-gray-800 p-6 rounded-xl shadow-xl transition-shadow hover:shadow-2xl">
                <ProfileSidebar onSave={handleSave} />
              </div>
              <div className="bg-gray-800 p-6 rounded-xl shadow-xl transition-shadow hover:shadow-2xl">
                <ExperimentsSidebar
                  open={showExperiments}
                  onClose={() => setShowExperiments(false)}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
