import ProfileForm from "@Presentation/Components/ProfileForm";
import ProfileSidebar from "@Presentation/Components/ProfileSidebar";

export default function ProfilePage() {
    return (
      <div className="min-h-screen bg-black text-white p-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ProfileForm />
          </div>
          <div>
            <ProfileSidebar />
          </div>
        </div>
      </div>
    );
  }
