import { useNavigate } from "react-router-dom";
import { useExperimentsViewModel } from "@Presentation/ViewModels/useExperimentsViewModel";
import ExperimentCard from "@/Presentation/Features/Experiments/ExperimentCard";
import DownloadDropdown from "@/Presentation/Features/Experiments/DownloadDropdown";
import ImportSection from "@/Presentation/Features/Experiments/Import";

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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex justify-center items-center p-4">
      <div className="bg-white text-black rounded-xl shadow-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Dine Eksperimenter</h2>
          <div className="flex gap-3">
            <button onClick={() => navigate("/create-experiment")} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">+ Opret Nyt</button>
            <button className="text-sm text-gray-500 hover:text-red-500" onClick={onClose}>✖ Luk</button>
          </div>
        </div>

        <DownloadDropdown
          open={downloadMenuOpen}
          onToggle={() => setDownloadMenuOpen(!downloadMenuOpen)}
          onJSON={handleDownloadAllJSON}
          onCSV={handleDownloadAllCSV}
        />

        {experiments.length === 0 ? (
          <p>Du har ingen eksperimenter endnu.</p>
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

        <ImportSection
          onFileChange={handleFileChange}
          onImport={handleImport}
          importData={importData}
        />
      </div>
    </div>
  );
}
