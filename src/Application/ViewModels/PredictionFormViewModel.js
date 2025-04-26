import { useState } from 'react';

/**
 * ViewModel to handle form state and submission for prediction.
 */
export const usePredictionFormViewModel = () => {
  const [formData, setFormData] = useState({
    temperature: '',
    humidity: '',
    pressure: '',
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const submitForm = async () => {
    try {
      const response = await fetch('http://localhost:5107/api/prediction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      alert("Prediction successful!");
    } catch (error) {
      console.error('Error on prediction:', error);
      alert("Error sending prediction");
    }
  };

  return { formData, handleChange, submitForm };
};
