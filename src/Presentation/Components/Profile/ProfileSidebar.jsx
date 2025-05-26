import React, { useState } from "react";
import ChangePasswordModal from "@/Presentation/Components/Profile/ChangePasswordModal";
import SidebarCard from "@/Presentation/Layout/Sidebar/SidebarCard";

// Sidebar-sektion til profilhåndtering uden billede-upload
export default function ProfileSidebar({ onSave }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <SidebarCard
      title="Profil"
      icon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 14c-3.33 0-6 1.34-6 3v1h12v-1c0-1.66-2.67-3-6-3zM12 12a4 4 0 100-8 4 4 0 000 8z"
          />
        </svg>
      }
    >
      <div className="space-y-2">
        {/* Ændre adgangskode */}
        <button
          onClick={() => setShowModal(true)}
          className="w-full border border-white px-4 py-2 rounded hover:bg-white hover:text-black transition"
        >
          Ændre kodeord
        </button>

        {/* Gem ændringer */}
        <button
          onClick={onSave}
          className="w-full border border-blue-500 text-blue-500 px-4 py-2 rounded hover:bg-blue-500 hover:text-white transition"
        >
          Gem ændringer
        </button>
      </div>

      {/* Modal til adgangskodeændring */}
      {showModal && (
        <div role="dialog" aria-modal="true">
          <ChangePasswordModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
          />
        </div>
      )}
    </SidebarCard>
  );
}
