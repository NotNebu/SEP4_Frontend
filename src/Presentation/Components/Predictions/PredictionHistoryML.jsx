import React, { useEffect, useState } from "react";
import {
  fetchPredictionHistory,
  deletePrediction,
} from "@/Application/Services/PredictionService";

// Oversættelser til dansk
const fieldMap = {
  soil_type: "Jordtype",
  water_frequency: "Vandingsfrekvens",
  fertilizer_type: "Gødningstype",
  sunlight_hours: "Solskinstimer",
  temperature: "Temperatur",
  humidity: "Luftfugtighed",
  prediction: "Forudsigelse",
  confidence: "Sikkerhed",
  message: "Besked",
  status: "Status",
  model_used: "Model",
};

const valueMap = {
  loam: "Muldjord",
  sandy: "Sandjord",
  clay: "Lerjord",
  daily: "Dagligt",
  weekly: "Ugentligt",
  "bi-weekly": "Hver 14. dag",
  chemical: "Kemisk",
  organic: "Organisk",
  none: "Ingen",
  success: "Succes",
  error: "Fejl",
};

const modelNameMap = {
  "mylrmodel_v6_logistic_regression.joblib": "Logistisk Regression v6",
  "finalversion_logistic_regression.joblib": "Logistisk Regression v5",
  "logistiskregression_logistic_regression.joblib":
    "Logistisk Regression (Eksperimentel)",
  "randomforestregressor.joblib": "Random Forest v1",
  "randomforestregressor_20250510_160735.joblib": "Random Forest v2",
  "randomforestregressor_20250511_210430.joblib": "Random Forest v3",
};

const translateMessage = (msg) => {
  if (!msg) return "";
  if (msg.includes("Logistic Regression prediction")) {
    return "Logistisk regression forudsigelse blev gennemført.";
  }
  if (msg.includes("Random Forest prediction")) {
    return "Random Forest forudsigelse blev gennemført.";
  }
  return msg;
};

const PredictionHistoryML = ({ refreshTrigger }) => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadPredictions = async () => {
    setLoading(true);
    try {
      const data = await fetchPredictionHistory();
      setEntries(data);
    } catch (_) {
      // Fejl ignoreres lydløst
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPredictions();
  }, [refreshTrigger]);

  const handleDelete = async (id) => {
    try {
      await deletePrediction(id);
      await loadPredictions();
    } catch (_) {
      alert("Fejl ved sletning af forudsigelse");
    }
  };

  const translateKey = (key) => fieldMap[key] || key;

  const translateValue = (value, key) => {
    if (key === "confidence" && typeof value === "number" && value >= 0 && value <= 1) {
      return (value * 100).toFixed(2) + "%";
    }
    return valueMap[value] || value;
  };

  return (
    <div className="mt-10 bg-gray-800 p-6 rounded-xl">
      <h2 className="text-xl font-bold mb-4">Tidligere forudsigelser</h2>

      {loading ? (
        <div className="text-gray-400">Indlæser tidligere forudsigelser...</div>
      ) : entries.length === 0 ? (
        <div className="text-gray-400">Ingen forudsigelser fundet.</div>
      ) : (
        <ul className="space-y-3 max-h-96 overflow-y-scroll pr-2">
          {entries.map((entry) => {
            let parsedInput = entry.input;
            let parsedResult = entry.result;
            try {
              if (typeof parsedInput === "string")
                parsedInput = JSON.parse(parsedInput);
              if (typeof parsedResult === "string")
                parsedResult = JSON.parse(parsedResult);
            } catch (_) {
              // Ignorer JSON parse fejl
            }

            return (
              <li key={entry.id} className="p-4 bg-gray-700 rounded-md shadow">
                <div className="text-sm font-semibold">
                  Model:{" "}
                  {modelNameMap[entry.model?.toLowerCase()] || entry.model}
                </div>

                <div className="mt-2 text-sm font-semibold">Input:</div>
                {Object.entries(parsedInput).map(([key, value]) => (
                  <div key={key} className="text-sm pl-2 text-gray-300">
                    {translateKey(key)}: {translateValue(value, key)}
                  </div>
                ))}

                <div className="mt-2 text-sm font-semibold">Resultat:</div>
                {Object.entries(parsedResult).map(([key, value]) => {
                  const displayKey = translateKey(key);
                  const displayValue =
                    key === "model_used"
                      ? modelNameMap[value?.toLowerCase()] || value
                      : key === "message"
                      ? translateMessage(value)
                      : translateValue(value, key);

                  return (
                    <div key={key} className="text-sm pl-2 text-gray-300">
                      {displayKey}: {displayValue}
                    </div>
                  );
                })}

                <div className="text-xs text-gray-400 mt-2">
                  Tidspunkt:{" "}
                  {new Date(entry.timestamp || entry.createdAt).toLocaleString()}
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
