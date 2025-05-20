import React, { useEffect, useState } from 'react';
import { fetchPredictionHistory, deletePrediction } from '@/Application/Services/PredictionService';

const PredictionHistoryML = ({ refreshTrigger }) => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

    const loadPredictions = async () => {
    setLoading(true);
    try {
      const data = await fetchPredictionHistory();
      setEntries(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Hent ved første indlæsning og hver gang trigger ændrer sig
  useEffect(() => {
    loadPredictions();
  }, [refreshTrigger]);

  const handleDelete = async (id) => {
    try {
      await deletePrediction(id);
      await loadPredictions(); // Reload listen efter sletning
    } catch (err) {
      alert("Fejl ved sletning af forudsigelse");
    }
  };

  return (
    <div className="mt-10 bg-gray-800 p-6 rounded-xl">
      <h2 className="text-xl font-bold mb-4">Tidligere forudsigelser</h2>

      {loading ? (
        // Vises mens data hentes
        <div className="text-gray-400">Indlæser tidligere forudsigelser...</div>
      ) : entries.length === 0 ? (
        // Vises hvis ingen resultater
        <div className="text-gray-400">Ingen forudsigelser fundet.</div>
      ) : (
        // Liste over forudsigelser
        <ul className="space-y-3 max-h-96 overflow-y-scroll pr-2"> {/* Altid scrollbar */}
          {entries.map((entry) => {
            // Forsøg at parse input/result som JSON
            let parsedInput = entry.input;
            let parsedResult = entry.result;
            try {
              if (typeof parsedInput === 'string') parsedInput = JSON.parse(parsedInput);
              if (typeof parsedResult === 'string') parsedResult = JSON.parse(parsedResult);
            } catch (_) {
              // Hvis parsing fejler, behold original string
            }

            return (
              <li key={entry.id} className="p-4 bg-gray-700 rounded-md shadow">
                <div className="text-sm font-semibold">Model: {entry.model}</div>

                <div className="mt-2 text-sm font-semibold">Input:</div>
                {Object.entries(parsedInput).map(([key, value]) => (
                  <div key={key} className="text-sm pl-2 text-gray-300">{key}: {value}</div>
                ))}

                <div className="mt-2 text-sm font-semibold">Resultat:</div>
                {Object.entries(parsedResult).map(([key, value]) => (
                  <div key={key} className="text-sm pl-2 text-gray-300">{key}: {value.toString()}</div>
                ))}

                <div className="text-xs text-gray-400 mt-2">
                  Tidspunkt: {new Date(entry.timestamp || entry.createdAt).toLocaleString()}
                </div>

                <button
                  className="mt-2 text-red-400 hover:underline text-sm"
                  onClick={() => handleDelete(entry.id)}
                >
                  Slet
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default PredictionHistoryML;
