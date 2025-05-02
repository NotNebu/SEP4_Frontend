import { useState } from "react";
import ChangePasswordModal from "@Presentation/Modals/ChangePasswordModal";

export default function ProfileSidebar() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="bg-gray-900 rounded-xl p-6 text-center">
      <div className="w-32 h-32 mx-auto rounded-full border-2 border-blue-500 flex items-center justify-center text-blue-500 mb-4">
        {/* Avatar-ikon */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14c-3.33 0-6 1.34-6 3v1h12v-1c0-1.66-2.67-3-6-3zM12 12a4 4 0 100-8 4 4 0 000 8z" />
        </svg>
      </div>

      <p className="text-lg font-semibold mb-4">Profil</p>

      <div className="space-y-2">
        <button className="w-full border border-white px-4 py-2 rounded hover:bg-white hover:text-black transition">Upload billede</button>

        <button
          onClick={() => setShowModal(true)}
          className="w-full border border-white px-4 py-2 rounded hover:bg-white hover:text-black transition"
        >
          Ændre password
        </button>

        <button className="w-full border border-blue-500 text-blue-500 px-4 py-2 rounded hover:bg-blue-500 hover:text-white transition">Gem ændringer</button>
      </div>

      <ChangePasswordModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}
