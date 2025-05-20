import { useState, useEffect } from "react";
import { submitPrediction, savePrediction, fetchAvailableModels } from "@/Application/Services/PredictionService";
import { useAuth } from "@/Shared/Context/AuthContext";


const fieldConfigs = {
  // Konfigurationer for inputfelter til forskellige modeltyper
  // Hver modeltype har en liste over felter med deres egenskaber
  // "logistic" og "rfc" er modeltyperne
  // "logistic" er en logistisk regressionsmodel
  // "rfc" er en Random Forest Classifier model
  // Hver modeltype har også versioner af trænede modeller
  logistic: [
    { name: "soil_type", placeholder: "Soil Type", options: ["loam", "sandy", "clay"] },
    { name: "water_frequency", placeholder: "Water Frequency", options: ["daily", "weekly", "bi-weekly"] },
    { name: "fertilizer_type", placeholder: "Fertilizer Type", options: ["chemical", "organic", "none"] },
    { name: "sunlight_hours", placeholder: "Sunlight Hours", type: "number" },
    { name: "temperature", placeholder: "Temperature", type: "number" },
    { name: "humidity", placeholder: "Humidity", type: "number" },
  ],
  rfc: [
    { name: "soil_type", placeholder: "Soil Type", type: "number" },
    { name: "sunlight_hours", placeholder: "Sunlight Hours", type: "number" },
    { name: "water_frequency", placeholder: "Water Frequency", type: "number" },
    { name: "fertilizer_type", placeholder: "Fertilizer Type", type: "number" },
    { name: "temperature", placeholder: "Temperature", type: "number" },
    { name: "humidity", placeholder: "Humidity", type: "number" },
  ],
};

// Henter modeltype baseret på modelnavn
const detectModelType = (modelName) => {
  if (modelName.toLowerCase().includes("log")) return "logistic";
  return "rfc";
};

// Henter tilgængelige modeller fra serveren
export const usePredictionFormViewModel = () => {
  const [modelName, setModelName] = useState("");
  const [modelType, setModelType] = useState("logistic");
  const [availableModels, setAvailableModels] = useState([]);
  const [formData, setFormData] = useState({});
  const [result, setResult] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const { user } = useAuth();

  // Henter tilgængelige modeller ved komponentens første rendering
  useEffect(() => {
    fetchAvailableModels()
      .then((models) => {
        setAvailableModels(models);
        if (models.length > 0) {
          setModelName(models[0]);
          setModelType(detectModelType(models[0]));
        }
      })
      .catch((err) => console.error("Kunne ikke hente modeller:", err));
  }, []);

  // Opdaterer modeltype når modelnavn ændres
  useEffect(() => {
  const newType = detectModelType(modelName);
  setModelType(newType);
  setFormData({}); // Nulstil alle inputfelter ved skiftning af modeltype
}, [modelName]);

  // Håndterer ændringer i inputfelter
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Håndterer nulstilling af formularen
  const handleClear = () => {
    setFormData({});
    setResult(null);
  };

  // Validering af inputfelter
   const validateInput = () => {

    // Tjek om alle påkrævede felter er udfyldt
     const requiredFields = fieldConfigs[modelType];
  for (const field of requiredFields) {
    const value = formData[field.name];
    if (value === undefined || value === null || value === "") {
      throw new Error("Venligst udfyld alle datafelter.");
    }
  }

   // Specifik validering for hver modeltype
    const { humidity, temperature, sunlight_hours } = formData;

    if (humidity < 10 || humidity > 100) {
      throw new Error("Fugtighed skal være mellem 10 og 100.");
    }
    if (temperature < 0 || temperature > 50) {
      throw new Error("Temperatur skal være mellem 0 og 50°C.");
    }
    if (sunlight_hours < 0 || sunlight_hours > 24) {
      throw new Error("Sollystimer skal være mellem 0 og 24.");
    }
  };
  
  // Håndterer indsendelse af forudsigelse
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      validateInput(); // validering af input
      const response = await submitPrediction({
        TypeofModel: modelType,
        ModelName: modelName,
        Data: formData,
      });
      const parsed = typeof response === "string" ? JSON.parse(response) : response;
      setResult(parsed);

      // Gem forudsigelse
      await savePrediction({
        model: modelType,
        fileName: modelName,
        input: formData,
        result: parsed,
      });

      // Opdater forudsigelseshistorik
      setRefreshTrigger((prev) => prev + 1);
    } catch (err) {
      alert(`Forudsigelse fejlede: ${err.message}`);
    }
  };

  // Returner viewModel
  return {
    modelName,
    setModelName,
    modelType,
    availableModels,
    refreshTrigger,
    formData,
    result,
    handleChange,
    handleClear,
    handleSubmit,
    getFields: () => fieldConfigs[modelType] || [],
  };
};
