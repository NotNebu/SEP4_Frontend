import React from 'react';
import { usePredictionFormViewModel } from "@Application/ViewModels/PredictionFormViewModel";

const PredictionFormPage = () => {
  const { formData, handleChange, submitForm } = usePredictionFormViewModel();

  const onChange = (e) => handleChange(e.target.name, e.target.value);

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Send Prediction Parameters</h1>
      <form 
        className="space-y-4"
        onSubmit={(e) => {e.preventDefault(); submitForm();}}
      >
        <input
          className="w-full p-2 border rounded text-black"
          type="number"
          name="temperature"
          value={formData.temperature}
          onChange={onChange}
          placeholder="Temperature"
          required
        />
        <input
          className="w-full p-2 border rounded text-black"
          type="number"
          name="humidity"
          value={formData.humidity}
          onChange={onChange}
          placeholder="Humidity"
          required
        />
        <input
          className="w-full p-2 border rounded text-black"
          type="number"
          name="pressure"
          value={formData.pressure}
          onChange={onChange}
          placeholder="Pressure"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default PredictionFormPage;
