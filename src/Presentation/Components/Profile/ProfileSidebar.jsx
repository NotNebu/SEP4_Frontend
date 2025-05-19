import React, { useState } from "react";
import ChangePasswordModal from "@/Presentation/Components/Profile/ChangePasswordModal";
import SidebarCard from "@/Presentation/Layout/Sidebar/SidebarCard";

// Sidebar-sektion til profilhåndtering: billede-upload og adgangskodeændring
export default function ProfileSidebar({ onSave }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  // Håndterer valg af billede
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Uploader valgt billede til backend
  const handleUpload = async () => {
    if (!selectedFile) return alert("Vælg en fil først.");

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("https://localhost:5107/api/account/upload-profile-image", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Fejl ved upload.");
      }

      alert("Billede uploadet!");
      setSelectedFile(null);
    } catch (err) {
      console.error(err);
      alert("Upload mislykkedes.");
    }
  };

  return (
    <SidebarCard
      title="Profil"
      icon={
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14c-3.33 0-6 1.34-6 3v1h12v-1c0-1.66-2.67-3-6-3zM12 12a4 4 0 100-8 4 4 0 000 8z" />
        </svg>
      }
    >
      <div className="space-y-2">
        {/* Billedevalg og preview */}
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {selectedFile && (
          <img
            src={URL.createObjectURL(selectedFile)}
            alt="Preview"
            className="mt-2 max-h-32 rounded shadow"
          />
        )}

        {/* Upload-knap */}
        <button
          onClick={handleUpload}
          className="w-full border border-white px-4 py-2 rounded hover:bg-white hover:text-black transition"
        >
          Upload billede
        </button>

        {/* Åbn modal for adgangskodeændring */}
        <button
          onClick={() => setShowModal(true)}
          className="w-full border border-white px-4 py-2 rounded hover:bg-white hover:text-black transition"
        >
          Ændre kodeord
        </button>

        {/* Gem ændringer (f.eks. profilfelter) */}
        <button
          onClick={onSave}
          className="w-full border border-blue-500 text-blue-500 px-4 py-2 rounded hover:bg-blue-500 hover:text-white transition"
        >
          Gem ændringer
        </button>
      </div>

      {/* Modal til at skifte adgangskode */}
      <ChangePasswordModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </SidebarCard>
  );
}
