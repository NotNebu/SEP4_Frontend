import { useState } from 'react';
import { submitPrediction, savePrediction } from '@/Application/Services/PredictionService';
import { useAuth } from '@Shared/Context/AuthContext';

// Konfiguration for hver ML-model
const modelConfigs = {
  logistic: {
    fields: [
      { name: 'Soil_Type', placeholder: 'Soil Type' },
      { name: 'Water_Frequency', placeholder: 'Water Frequency' },
      { name: 'Fertilizer_Type', placeholder: 'Fertilizer Type' },
      { name: 'Sunlight_Hours', placeholder: 'Sunlight Hours', type: 'number' },
      { name: 'Temperature', placeholder: 'Temperature', type: 'number' },
      { name: 'Humidity', placeholder: 'Humidity', type: 'number' }
    ],
    modelKey: 'ModelName',
    fileName: 'log_reg_pipeline.joblib',
    type: 'logistic'
  },
  rfc: {
    fields: [
      { name: 'soil_type', placeholder: 'Soil Type', type: 'number' },
      { name: 'sunlight_hours', placeholder: 'Sunlight Hours', type: 'number' },
      { name: 'water_frequency', placeholder: 'Water Frequency', type: 'number' },
      { name: 'fertilizer_type', placeholder: 'Fertilizer Type', type: 'number' },
      { name: 'temperature', placeholder: 'Temperature', type: 'number' },
      { name: 'humidity', placeholder: 'Humidity', type: 'number' }
    ],
    modelKey: 'NameOfModel',
    fileName: 'RandomForestRegressor.joblib',
    type: 'rfc'
  }
};

// Hook til én enkelt model
const useSingleModel = ({ fields, modelKey, fileName, type, onAfterSubmit }) => {
  const [formData, setFormData] = useState({});
  const [result, setResult] = useState(null);
  const { user } = useAuth();

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleClear = () => {
    setFormData({});
    setResult(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const sunlight = formData.Sunlight_Hours ?? formData.sunlight_hours;
    const temp = formData.Temperature ?? formData.temperature;
    const humidity = formData.Humidity ?? formData.humidity;

    if (sunlight > 24) return alert("Maksimalt antal soltimer er 24.");
    if (temp > 50) return alert("Temperaturen må ikke overstige 50°C.");
    if (humidity > 50 || humidity < 10) return alert("Fugtighed skal være mellem 10 og 50.");

    const payload = {
      TypeofModel: type,
      [modelKey]: fileName,
      Data: formData
    };

    try {
      const response = await submitPrediction(payload);
      const parsed = typeof response === 'string' ? JSON.parse(response) : response;
      setResult(parsed);

      await savePrediction({
        model: type,
        fileName,
        input: formData,
        result: parsed,
      });

      onAfterSubmit?.(); //  opdatere forudsigelseslisten

    } catch (err) {
      alert(`Forudsigelse fejlede: ${err.message}`);
    }
  };

  return {
    formData,
    result,
    handleChange,
    handleClear,
    handleSubmit,
    getFields: () => fields
  };
};

// ViewModel hook til alle modeller
export const usePredictionFormViewModel = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleRefresh = () => setRefreshTrigger(prev => prev + 1);

  return {
    logistic: useSingleModel({ ...modelConfigs.logistic, onAfterSubmit: handleRefresh }),
    rfc: useSingleModel({ ...modelConfigs.rfc, onAfterSubmit: handleRefresh }),
    refreshTrigger
  };
};
