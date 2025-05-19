import { useNavigate } from "react-router-dom";
import { useExperimentsViewModel } from "@/Presentation/Hooks/useExperimentsViewModel";
import ExperimentCard from "@/Presentation/Components/Experiments/ExperimentCard";
import DownloadDropdown from "@/Presentation/Components/Shared/Dropdown/DropdownDownload";
import ImportSection from "@/Presentation/Components/Experiments/FileImport";
import Modal from "@Presentation/Components/Shared/Modal/Modal";
import ModalActionBar from "@Presentation/Components/Shared/Modal/ModalActionBar";
import EmptyStateMessage from "@/Presentation/Components/Shared/UI/EmptyStateMessage";

// Modal til visning, download og import af brugerens eksperimenter
export default function ExperimentsModal({ isOpen, onClose }) {
  const navigate = useNavigate();

  const {
    experiments,
    expanded,
    setExpanded,
    downloadMenuOpen,
    setDownloadMenuOpen,
    importData,
    handleDelete,
    handleImport,
    handleFileChange,
    downloadJSON,
    downloadCSV,
    handleDownloadAllJSON,
    handleDownloadAllCSV,
  } = useExperimentsViewModel(isOpen);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {/* Titel og handlingsknap */}
      <ModalActionBar
        title="Dine Eksperimenter"
        actions={[
          {
            label: "+ Opret Nyt",
            variant: "success",
            onClick: () => navigate("/create-experiment"),
          },
        ]}
      />

      {/* Dropdown til download af alle eksperimenter */}
      <div className="mb-4">
        <DownloadDropdown
          open={downloadMenuOpen}
          onToggle={() => setDownloadMenuOpen(!downloadMenuOpen)}
          onJSON={handleDownloadAllJSON}
          onCSV={handleDownloadAllCSV}
        />
      </div>

      {/* Liste over eksperimenter eller tom tilstand */}
      {experiments.length === 0 ? (
        <EmptyStateMessage message="Du har ingen eksperimenter endnu." />
      ) : (
        <ul className="space-y-3">
          {experiments.map((exp) => (
            <ExperimentCard
              key={exp.id}
              exp={exp}
              expanded={expanded}
              setExpanded={setExpanded}
              onDelete={handleDelete}
              onDownloadJSON={downloadJSON}
              onDownloadCSV={downloadCSV}
            />
          ))}
        </ul>
      )}

      {/* Importsektion for fil-upload */}
      <ImportSection
        onFileChange={handleFileChange}
        onImport={handleImport}
        importData={importData}
      />
    </Modal>
  );
}
