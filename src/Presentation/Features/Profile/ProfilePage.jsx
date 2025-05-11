import { useAuth } from "@Shared/Context/AuthContext";
import ProfileForm from "@/Presentation/Features/Profile/ProfileForm";
import ProfileSidebar from "@/Presentation/Features/Profile/ProfileSidebar";
import ExperimentsSidebar from "@/Presentation/Features/Experiments/ExperimentsSidebar";
import { useProfileViewModel } from "@Presentation/Features/Profile/useProfileViewModel";

export default function ProfilePage() {
  const { user, loading: authLoading } = useAuth();
  const { profile, loading, handleChange, handleSave } = useProfileViewModel();

  if (authLoading || loading) return <p className="text-white">Loader...</p>;
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
