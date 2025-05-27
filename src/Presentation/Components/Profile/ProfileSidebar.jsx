import React, { useState } from "react";
import ChangePasswordModal from "@/Presentation/Components/Profile/ChangePasswordModal";
import SidebarCard from "@/Presentation/Layout/Sidebar/SidebarCard";
import Button from "@/Presentation/Components/Shared/UI/Button";

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
        <Button
          onClick={() => setShowModal(true)}
          label="Ændre kodeord"
          variant="outline"
          fullWidth
        />
        
        {/* Gem ændringer */}
        <Button
          onClick={onSave}
          label="Gem ændringer"
          variant="primary"
          fullWidth
        />
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
