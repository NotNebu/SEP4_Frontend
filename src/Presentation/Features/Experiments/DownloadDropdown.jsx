export default function DownloadDropdown({ open, onToggle, onJSON, onCSV }) {
  return (
    <div className="relative inline-block text-left mb-4">
      <button
        onClick={onToggle}
        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm flex items-center"
      >
        Download <span className="ml-2">▾</span>
      </button>
      {open && (
        <div className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            <button onClick={onJSON} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">JSON (alle)</button>
            <button onClick={onCSV} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">CSV (alle)</button>
          </div>
        </div>
      )}
    </div>
  );
}
