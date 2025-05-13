import { useState } from 'react';
import { submitPrediction } from '@Presentation/Features/Prediction/PredictionApi';

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

const useSingleModel = ({ fields, modelKey, fileName, type }) => {
  const [formData, setFormData] = useState({});
  const [result, setResult] = useState(null);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleClear = () => {
    setFormData({});
    setResult(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      TypeofModel: type,
      [modelKey]: fileName,
      Data: formData
    };

    try {
      const response = await submitPrediction(payload);
      setResult(typeof response === 'string' ? JSON.parse(response) : response);
    } catch (err) {
      alert(`Prediction failed: ${err.message}`);
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

export const usePredictionFormViewModel = () => ({
  logistic: useSingleModel(modelConfigs.logistic),
  rfc: useSingleModel(modelConfigs.rfc)
});

