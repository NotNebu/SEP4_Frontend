import { useEffect, useState } from "react";
import {
  getMyExperiments,
  deleteExperiment,
  createExperiment,
} from "@/Application/Services/ExperimentService";

/**
 * Hook til håndtering af eksperimenter
 * Indeholder logik til hentning, import, eksport og sletning af eksperimenter
 */
const normalizeDataJson = (dataJson) => {
  if (Array.isArray(dataJson)) return dataJson;
  if (typeof dataJson === "object" && dataJson !== null) {
    const keys = Object.keys(dataJson);
    if (keys.every((key) => !isNaN(key))) {
      return keys.map((k) => dataJson[k]);
    }
  }
  return [dataJson];
};

export const useExperimentsViewModel = (isOpen) => {
  const [experiments, setExperiments] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [downloadMenuOpen, setDownloadMenuOpen] = useState(false);
  const [importFile, setImportFile] = useState(null);
  const [importData, setImportData] = useState(null);

  useEffect(() => {
    if (isOpen) {
      getMyExperiments()
        .then((rawExperiments) => {
          const parsedExperiments = rawExperiments.map((exp) => {
            let parsed = [];

            try {
              parsed = normalizeDataJson(
                typeof exp.dataJson === "string"
                  ? JSON.parse(exp.dataJson)
                  : exp.dataJson
              );
            } catch (_) {}

            return {
              ...exp,
              dataJson: parsed,
            };
          });

          setExperiments(parsedExperiments);
        })
        .catch(() => {
          alert("Kunne ikke hente eksperimenter.");
        });
    }
  }, [isOpen]);

  // Sletter et eksperiment
  const handleDelete = async (id) => {
    try {
      await deleteExperiment(id);
      setExperiments((prev) => prev.filter((exp) => exp.id !== id));
    } catch (_) {
      alert("Fejl ved sletning.");
    }
  };

  // Eksporterer alle eksperimenter som JSON
  const handleDownloadAllJSON = () => {
    const blob = new Blob([JSON.stringify(experiments, null, 2)], {
      type: "application/json",
    });
    downloadBlob(blob, "experiments.json");
  };

  // Eksporterer alle eksperimenter som CSV
  const handleDownloadAllCSV = () => {
    const allRows = experiments.flatMap((exp) => {
      const rows = normalizeDataJson(exp.dataJson);
      return rows.map((row) => ({
        id: exp.id,
        title: exp.title,
        ...row,
      }));
    });

    const headers = allRows.length > 0 ? Object.keys(allRows[0]) : [];
    const csv = [
      headers.join(","),
      ...allRows.map((row) =>
        headers.map((h) => JSON.stringify(row[h] ?? "")).join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    downloadBlob(blob, "experiments.csv");
  };

  // Eksporterer et enkelt eksperiment som JSON
  const downloadJSON = (exp) => {
    const blob = new Blob([JSON.stringify(exp, null, 2)], {
      type: "application/json",
    });
    downloadBlob(blob, `${exp.title || exp.id}.json`);
  };

  // Eksporterer et enkelt eksperiment som CSV
  const downloadCSV = (exp) => {
    const rows = normalizeDataJson(exp.dataJson);
    const headers = rows.length > 0 ? Object.keys(rows[0]) : [];

    const csv = [
      headers.join(","),
      ...rows.map((row) =>
        headers.map((h) => JSON.stringify(row[h] ?? "")).join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    downloadBlob(blob, `${exp.title || exp.id}.csv`);
  };

  // Håndterer filvalg til import
  const handleFileChange = (file) => {
    if (!file) return;
    setImportFile(file);

    file
      .text()
      .then((text) => {
        try {
          if (file.name.toLowerCase().endsWith(".json")) {
            const parsed = JSON.parse(text);
            setImportData(normalizeDataJson(parsed));
          } else if (file.name.toLowerCase().endsWith(".csv")) {
            const [headerRow, ...dataRows] = parseCSV(text);
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
        } catch (_) {
          alert("Fejl ved læsning af fil");
        }
      })
      .catch(() => {
        alert("Fejl ved læsning af fil");
      });
  };

  // Importerer et eksperiment fra valgt fil
  const handleImport = async () => {
    if (!importData) {
      alert("Vælg en fil først.");
      return;
    }

    const payload = {
      title: importFile.name.replace(/\.(json|csv)$/i, ""),
      dataJson: importData,
    };

    try {
      const newExp = await createExperiment(payload);
      setExperiments((prev) => [...prev, newExp]);
      alert("Eksperiment importeret!");
      setImportFile(null);
      setImportData(null);
    } catch (_) {
      alert("Fejl ved import.");
    }
  };

  // Hjælpefunktion til at downloade Blob som fil
  const downloadBlob = (blob, filename) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Parser CSV-tekst til array
  const parseCSV = (text) => {
    const rows = [];
    let row = [],
      cell = "",
      inQuotes = false;

    for (let i = 0; i < text.length; i++) {
      const char = text[i],
        next = text[i + 1];
      if (char === '"' && inQuotes && next === '"') {
        cell += '"';
        i++;
      } else if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === "," && !inQuotes) {
        row.push(cell);
        cell = "";
      } else if (
        (char === "\n" || (char === "\r" && next === "\n")) &&
        !inQuotes
      ) {
        row.push(cell);
        rows.push(row);
        row = [];
        cell = "";
        if (char === "\r") i++;
      } else {
        cell += char;
      }
    }

    if (cell !== "" || row.length) {
      row.push(cell);
      rows.push(row);
    }

    return rows;
  };

  return {
    experiments,
    expanded,
    setExpanded,
    downloadMenuOpen,
    setDownloadMenuOpen,
    importFile,
    importData,
    handleFileChange,
    handleImport,
    handleDelete,
    downloadJSON,
    downloadCSV,
    handleDownloadAllJSON,
    handleDownloadAllCSV,
  };
};
