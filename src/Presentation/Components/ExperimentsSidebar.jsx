import { useState } from "react";
import ExperimentsModal from "../Modals/ExperimentsModal";

export default function ExperimentsSidebar() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="bg-gray-900 rounded-xl p-6 text-center mt-8">
      <p className="text-lg font-semibold mb-4">Eksperimenter</p>
      <button
        onClick={() => setShowModal(true)}
        className="w-full border border-blue-500 text-blue-500 px-4 py-2 rounded hover:bg-blue-500 hover:text-white transition"
      >
        Vis mine eksperimenter
      </button>

      <ExperimentsModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}
