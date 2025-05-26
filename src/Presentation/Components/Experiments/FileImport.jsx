import Card from "@/Presentation/Components/Shared/UI/Card";
import Button from "@/Presentation/Components/Shared/UI/Button";
import FileUploadSection from "@/Presentation/Components/Shared/UI/FileUploadSection";

// Komponent til import af eksperimenter via JSON eller CSV-fil
export default function FileImport({ onFileChange, onImport, importData }) {
  return (
    <Card className="mt-6">
      {/* Titel */}
      <h3 className="text-lg font-semibold mb-2">Importer nyt eksperiment</h3>

      {/* Filvælger */}
      <input
        type="file"
        accept=".json,.csv"
        onChange={(e) => onFileChange(e.target.files[0])}
        className="mb-4 block text-sm text-gray-400 file:mr-4 file:py-2 file:px-4
                   file:rounded-md file:border-0
                   file:text-sm file:font-semibold
                   file:bg-purple-600 file:text-white
                   hover:file:bg-purple-700"
      />

      {/* Import-knap */}
      <Button
        label="Importér Eksperiment"
        onClick={onImport}
        variant="primary"
      />

      {/* Forhåndsvisning af importeret data */}
      {importData && (
        <div className="mt-4 bg-gray-100 p-2 rounded font-mono text-sm max-h-40 overflow-y-auto text-gray-800">
          <pre>{JSON.stringify(importData, null, 2)}</pre>
        </div>
      )}
    </Card>
  );
}
