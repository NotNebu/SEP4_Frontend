import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ExperimentsModal({ isOpen, onClose }) {
  const [experiments, setExperiments] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [downloadMenuOpen, setDownloadMenuOpen] = useState(false);
  const [importFile, setImportFile] = useState(null);
  const [importData, setImportData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      fetch("https://localhost:5107/api/experiment/my-experiments", {
        credentials: "include",
      })
        .then((res) => res.json())
        .then(setExperiments)
        .catch(console.error);
    }
  }, [isOpen]);

  const handleDelete = async (id) => {
    await fetch(`https://localhost:5107/api/experiment/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    setExperiments((prev) => prev.filter((exp) => exp.id !== id));
  };

  const downloadJSON = (exp) => {
    const blob = new Blob([JSON.stringify(exp, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${exp.title || exp.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadCSV = (exp) => {
    const data =
      typeof exp.dataJson === "string"
        ? JSON.parse(exp.dataJson)
        : exp.dataJson;
    const rows = Array.isArray(data) ? data : [data];
    const headers = rows.length > 0 ? Object.keys(rows[0]) : [];
    const csv = [
      headers.join(","),
      ...rows.map((row) =>
        headers
          .map((h) =>
            JSON.stringify(row[h], (_, v) => (v == null ? "" : v))
          )
          .join(",")
      ),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${exp.title || exp.id}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadAllJSON = () => {
    const blob = new Blob([JSON.stringify(experiments, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `experiments.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadAllCSV = () => {
    const allData = experiments.map((exp) => ({
      id: exp.id,
      title: exp.title,
      ...(typeof exp.dataJson === "string"
        ? JSON.parse(exp.dataJson)
        : exp.dataJson),
    }));
    const rows = allData;
    const headers = rows.length > 0 ? Object.keys(rows[0]) : [];
    const csv = [
      headers.join(","),
      ...rows.map((row) =>
        headers
          .map((h) =>
            JSON.stringify(row[h], (_, v) => (v == null ? "" : v))
          )
          .join(",")
      ),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `experiments.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // CSV-parser der håndterer quotes, escaped quotes, commas og linjeskift
  function parseCSV(text) {
    const rows = [];
    let row = [];
    let cell = "";
    let inQuotes = false;

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const next = text[i + 1];

      if (char === '"' && inQuotes && next === '"') {
        // Escapet dobbelttegn
        cell += '"';
        i++;
      } else if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === "," && !inQuotes) {
        row.push(cell);
        cell = "";
      } else if ((char === "\n" || (char === "\r" && next === "\n")) && !inQuotes) {
        row.push(cell);
        rows.push(row);
        row = [];
        cell = "";
        if (char === "\r") i++;
      } else {
        cell += char;
      }
    }

    // Sidste række
    if (cell !== "" || row.length) {
      row.push(cell);
      rows.push(row);
    }

    return rows;
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImportFile(file);

    file
      .text()
      .then((text) => {
        if (file.name.toLowerCase().endsWith(".json")) {
          setImportData(JSON.parse(text));
        } else if (file.name.toLowerCase().endsWith(".csv")) {
          const table = parseCSV(text);
          const [headerRow, ...dataRows] = table;
          const data = dataRows.map((r) =>
            r.reduce((obj, val, idx) => {
              obj[headerRow[idx]] = val;
              return obj;
            }, {})
          );
          setImportData(data);
        } else {
          alert("Understøtter kun JSON eller CSV.");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Fejl ved læsning af fil");
      });
  };

  const handleImport = async () => {
    if (!importData) {
      alert("Vælg en fil først.");
      return;
    }

    // Bygger payload til nyt eksperiment
    const payload = {
      title: importData.title
        ? importData.title
        : importFile.name.replace(/\.(json|csv)$/i, ""),
      dataJson: importData,
    };

    try {
      const res = await fetch("https://localhost:5107/api/experiment", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(await res.text());
      const newExp = await res.json();
      setExperiments((prev) => [...prev, newExp]);
      alert("Eksperiment importeret!");
      setImportFile(null);
      setImportData(null);
    } catch (err) {
      console.error(err);
      alert("Fejl ved import: " + err.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex justify-center items-center p-4">
      <div className="bg-white text-black rounded-xl shadow-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Dine Eksperimenter</h2>
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/create-experiment")}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              + Opret Nyt
            </button>
            <button
              className="text-sm text-gray-500 hover:text-red-500"
              onClick={onClose}
            >
              ✖ Luk
            </button>
          </div>
        </div>

        {/* Download-dropdown */}
        <div className="relative inline-block text-left mb-4">
          <button
            onClick={() => setDownloadMenuOpen(!downloadMenuOpen)}
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm flex items-center"
          >
            Download <span className="ml-2">▾</span>
          </button>
          {downloadMenuOpen && (
            <div className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div className="py-1">
                <button
                  onClick={handleDownloadAllJSON}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  JSON (alle)
                </button>
                <button
                  onClick={handleDownloadAllCSV}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  CSV (alle)
                </button>
              </div>
            </div>
          )}
        </div>

        {experiments.length === 0 ? (
          <p>Du har ingen eksperimenter endnu.</p>
        ) : (
          <ul className="space-y-3">
            {experiments.map((exp) => (
              <li
                key={exp.id}
                className="border p-4 rounded-lg bg-gray-50 shadow-sm"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{exp.title}</h3>
                    <p className="text-sm text-gray-600">
                      {exp.description}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Oprettet: {exp.createdAt}
                    </p>
                    {expanded === exp.id && (
                      <div className="mt-2 text-sm bg-gray-100 p-2 rounded font-mono text-gray-800 max-h-40 overflow-y-auto">
                        <pre>{exp.dataJson}</pre>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 items-end ml-4">
                    <button
                      onClick={() => downloadJSON(exp)}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      Download JSON
                    </button>
                    <button
                      onClick={() => downloadCSV(exp)}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      Download CSV
                    </button>
                    <button
                      onClick={() =>
                        setExpanded(expanded === exp.id ? null : exp.id)
                      }
                      className="text-blue-600 hover:underline text-sm"
                    >
                      {expanded === exp.id ? "Skjul info" : "Se mere"}
                    </button>
                    <button
                      onClick={() => handleDelete(exp.id)}
                      className="text-red-600 hover:underline text-sm"
                    >
                      Slet
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* Import nyt eksperiment */}
        <div className="mt-6 border-t pt-4">
          <h3 className="text-lg font-semibold mb-2">
            Importer nyt eksperiment
          </h3>
          <input
            type="file"
            accept=".json,.csv"
            onChange={handleFileChange}
            className="mb-2"
          />
          <button
            onClick={handleImport}
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
      </div>
    </div>
  );
}
