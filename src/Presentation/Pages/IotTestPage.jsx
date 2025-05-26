import React, { useEffect, useState } from "react";
import {
  getAllIotExperiments,
  getIotLatestMeasurements,
} from "@Application/Services/IotService";

export default function IotTestPage() {
  const [experiments, setExperiments] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [measurements, setMeasurements] = useState([]);
  const [error, setError] = useState("");

  // Hent alle eksperimenter ved load
  useEffect(() => {
    getAllIotExperiments()
      .then(setExperiments)
      .catch((err) => setError(err.message));
  }, []);

  // Hent nyeste målinger når eksperiment vælges
  useEffect(() => {
    if (!selectedId) return;
    getIotLatestMeasurements(selectedId)
      .then(setMeasurements)
      .catch((err) => setError(err.message));
  }, [selectedId]);

  return (
    <div className="p-4 max-w-screen-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">IoT Test Page</h1>

      {error && <p className="text-red-500 mb-4">Fejl: {error}</p>}

      <div className="mb-4">
        <label className="font-medium mr-2">Vælg Eksperiment:</label>
        <select
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">-- Vælg --</option>
          {experiments.map((exp) => (
            <option key={exp.id} value={exp.id}>
              {exp.name || `Eksperiment #${exp.id}`}
            </option>
          ))}
        </select>
      </div>

      {measurements.length > 0 && (
        <div className="overflow-x-auto border rounded p-2 bg-white shadow">
          <table className="min-w-full table-auto text-sm">
            <thead>
              <tr className="bg-gray-100 text-left">
                {Object.keys(measurements[0]).map((key) => (
                  <th key={key} className="px-3 py-2 border-b font-medium">
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {measurements.map((m, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  {Object.values(m).map((val, i) => (
                    <td key={i} className="px-3 py-1 border-b">
                      {typeof val === "number" ? val.toFixed(2) : String(val)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {measurements.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Raw JSON</h2>
          <pre className="bg-gray-900 text-white p-4 rounded max-h-96 overflow-y-auto text-xs">
            {JSON.stringify(measurements, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
