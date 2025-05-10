export default function ExperimentCard({
  exp,
  expanded,
  setExpanded,
  onDelete,
  onDownloadJSON,
  onDownloadCSV,
}) {
  return (
    <li className="border p-4 rounded-lg bg-gray-50 shadow-sm">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{exp.title}</h3>
          <p className="text-sm text-gray-600">{exp.description}</p>
          <p className="text-xs text-gray-400 mt-1">Oprettet: {exp.createdAt}</p>
          {expanded === exp.id && (
            <div className="mt-2 text-sm bg-gray-100 p-2 rounded font-mono text-gray-800 max-h-40 overflow-y-auto">
              <pre>{exp.dataJson}</pre>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2 items-end ml-4">
          <button onClick={() => onDownloadJSON(exp)} className="text-blue-600 hover:underline text-sm">Download JSON</button>
          <button onClick={() => onDownloadCSV(exp)} className="text-blue-600 hover:underline text-sm">Download CSV</button>
          <button onClick={() => setExpanded(expanded === exp.id ? null : exp.id)} className="text-blue-600 hover:underline text-sm">
            {expanded === exp.id ? "Skjul info" : "Se mere"}
          </button>
          <button onClick={() => onDelete(exp.id)} className="text-red-600 hover:underline text-sm">Slet</button>
        </div>
      </div>
    </li>
  );
}
