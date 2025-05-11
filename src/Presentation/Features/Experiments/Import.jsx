export default function Import({ onFileChange, onImport, importData }) {
  return (
    <div className="mt-6 border-t pt-4">
      <h3 className="text-lg font-semibold mb-2">Importer nyt eksperiment</h3>
      <input
        type="file"
        accept=".json,.csv"
        onChange={(e) => onFileChange(e.target.files[0])}
        className="mb-2"
      />
      <button
        onClick={onImport}
        className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
      >
        Importér Eksperiment
      </button>
      {importData && (
        <div className="mt-4 bg-gray-100 p-2 rounded font-mono text-sm max-h-40 overflow-y-auto">
          <pre>{JSON.stringify(importData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
