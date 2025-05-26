import { useState, useEffect } from "react";
import {
  submitPrediction,
  savePrediction,
  fetchAvailableModels,
} from "@/Application/Services/PredictionService";
import { useAuth } from "@/Shared/Context/AuthContext";

// Hook til håndtering af forudsigelsesformular
// Indeholder logik til valg af model, validering, indsendelse og lagring af forudsigelser
const fieldConfigs = {
  logistic: [
    {
      name: "soil_type",
      placeholder: "Soil Type",
      options: ["loam", "sandy", "clay"],
    },
    {
      name: "water_frequency",
      placeholder: "Water Frequency",
      options: ["daily", "weekly", "bi-weekly"],
    },
    {
      name: "fertilizer_type",
      placeholder: "Fertilizer Type",
      options: ["chemical", "organic", "none"],
    },
    { name: "sunlight_hours", placeholder: "Sunlight Hours", type: "number" },
    { name: "temperature", placeholder: "Temperature", type: "number" },
    { name: "humidity", placeholder: "Humidity", type: "number" },
  ],
  rfc: [
    { name: "soil_type", placeholder: "Jord Type", type: "number" },
    { name: "sunlight_hours", placeholder: "Sollys Timer", type: "number" },
    {
      name: "water_frequency",
      placeholder: "Vandings Frekvens",
      type: "number",
    },
    { name: "fertilizer_type", placeholder: "Gødnings Type", type: "number" },
    { name: "temperature", placeholder: "Temperatur", type: "number" },
    { name: "humidity", placeholder: "Fugtighed", type: "number" },
  ],
};

const detectModelType = (modelName) => {
  if (modelName.toLowerCase().includes("log")) return "logistic";
  return "rfc";
};

export const usePredictionFormViewModel = () => {
  const [modelName, setModelName] = useState("");
  const [modelType, setModelType] = useState("logistic");
  const [availableModels, setAvailableModels] = useState([]);
  const [formData, setFormData] = useState({});
  const [result, setResult] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const { user } = useAuth();

  useEffect(() => {
    fetchAvailableModels()
      .then((models) => {
        setAvailableModels(models);
        if (models.length > 0) {
          setModelName(models[0]);
          setModelType(detectModelType(models[0]));
        }
      })
      .catch(() => {
        alert("Kunne ikke hente tilgængelige modeller. Prøv igen senere.");
      });
  }, []);

  useEffect(() => {
    const newType = detectModelType(modelName);
    setModelType(newType);
    setFormData({});
  }, [modelName]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleClear = () => {
    setFormData({});
    setResult(null);
  };

  // Validerer inputfelter før forudsigelse sendes
  const validateInput = () => {
    const requiredFields = fieldConfigs[modelType];
    for (const field of requiredFields) {
      const value = formData[field.name];
      if (value === undefined || value === null || value === "") {
        throw new Error("Venligst udfyld alle datafelter.");
      }
    }

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
      validateInput();
      const response = await submitPrediction({
        TypeofModel: modelType,
        ModelName: modelName,
        Data: formData,
      });

      const parsed =
        typeof response === "string" ? JSON.parse(response) : response;
      setResult(parsed);

      await savePrediction({
        model: modelType,
        fileName: modelName,
        input: formData,
        result: parsed,
      });

      setRefreshTrigger((prev) => prev + 1);
    } catch (err) {
      alert(`Forudsigelse fejlede: ${err.message}`);
    }
  };

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
