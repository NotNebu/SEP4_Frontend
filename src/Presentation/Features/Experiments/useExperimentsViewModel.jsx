import { useEffect, useState } from "react";

export const useExperimentsViewModel = (isOpen) => {
  const [experiments, setExperiments] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [downloadMenuOpen, setDownloadMenuOpen] = useState(false);
  const [importFile, setImportFile] = useState(null);
  const [importData, setImportData] = useState(null);

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

  const parseCSV = (text) => {
    const rows = [];
    let row = [], cell = "", inQuotes = false;

    for (let i = 0; i < text.length; i++) {
      const char = text[i], next = text[i + 1];
      if (char === '"' && inQuotes && next === '"') {
        cell += '"'; i++;
      } else if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === "," && !inQuotes) {
        row.push(cell); cell = "";
      } else if ((char === "\n" || (char === "\r" && next === "\n")) && !inQuotes) {
        row.push(cell); rows.push(row); row = []; cell = ""; if (char === "\r") i++;
      } else {
        cell += char;
      }
    }

    if (cell !== "" || row.length) {
      row.push(cell); rows.push(row);
    }

    return rows;
  };

  const handleFileChange = (file) => {
    if (!file) return;
    setImportFile(file);

    file
      .text()
      .then((text) => {
        if (file.name.toLowerCase().endsWith(".json")) {
          setImportData(JSON.parse(text));
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
