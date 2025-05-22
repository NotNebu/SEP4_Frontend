import Button from "@/Presentation/Components/Shared/UI/Button";

/**
 * FileUploadSection – Genanvendelig sektion til upload og visning af preview-data.
 * Understøtter CSV/JSON og viser valgfrit preview.
 */
export default function FileUploadSection({
  title = "Upload fil",
  accept = ".json,.csv",
  onFileChange,
  onConfirm,
  previewData,
}) {
  return (
    <div className="mt-6 border-t pt-4">
      {/* Titel */}
      <h3 className="text-lg font-semibold mb-2">{title}</h3>

      {/* Filvælger */}
      <input
        type="file"
        accept={accept}
        onChange={(e) => onFileChange(e.target.files[0])}
        className="mb-4 block text-sm text-gray-400 file:mr-4 file:py-2 file:px-4
                   file:rounded-md file:border-0
                   file:text-sm file:font-semibold
                   file:bg-purple-600 file:text-white
                   hover:file:bg-purple-700"
      />

      {/* Import-knap */}
      <Button label="Importer" onClick={onConfirm} variant="primary" />

      {/* Valgfri preview af indlæst data */}
      {previewData && (
        <div className="mt-4 bg-gray-100 p-2 rounded font-mono text-sm max-h-40 overflow-y-auto text-gray-800">
          <pre>{JSON.stringify(previewData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
