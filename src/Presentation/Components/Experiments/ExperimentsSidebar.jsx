import { useState, useEffect } from "react";
import ExperimentsModal from "./ExperimentsModal";
import SidebarCard from "@/Presentation/Layout/Sidebar/SidebarCard";
import Button from "@/Presentation/Components/Shared/UI/Button";

// Sidebar-komponent til adgang til brugerens eksperimenter
export default function ExperimentsSidebar({ open = false, onClose }) {
  const [showModal, setShowModal] = useState(false);

  // Åbn modal når sidebar åbnes
  useEffect(() => {
    if (open) setShowModal(true);
  }, [open]);

  // Luk modal og informer parent
  const handleClose = () => {
    setShowModal(false);
    onClose?.();
  };

  return (
    <SidebarCard title="Eksperimenter">
      {/* Knap til at åbne modal med eksperimenter */}
      <Button
        label="Vis mine eksperimenter"
        variant="outline"
        fullWidth
        onClick={() => setShowModal(true)}
      />

      {/* Modal med oversigt og funktioner */}
      <ExperimentsModal isOpen={showModal} onClose={handleClose} />
    </SidebarCard>
  );
}
