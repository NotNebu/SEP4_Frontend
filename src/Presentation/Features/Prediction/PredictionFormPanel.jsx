import React from 'react';
import { PredictionResult } from '@Presentation/Features/Prediction/PredictionResult';

export const PredictionFormPanel = ({
  modelName,
  fields,
  formData,
  result,
  onChange,
  onSubmit,
  onClear
}) => {
  return (
    <div className="bg-gray-800 text-white p-6 rounded-xl shadow-xl w-full">
      <h2 className="text-2xl font-semibold mb-4">{modelName} Prediction</h2>

      <form onSubmit={onSubmit} className="space-y-3">
        {fields.map(({ name, placeholder, type }) => (
          <input
            key={name}
            name={name}
            placeholder={placeholder}
            type={type || 'text'}
            value={formData[name] || ''}
            onChange={(e) => onChange(name, e.target.value)}
            className="w-full p-2 rounded border text-black"
            required
          />
        ))}

        <div className="flex gap-4 mt-4">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
          >
            Predict
          </button>
          <button
            type="button"
            onClick={onClear}
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
          >
            Clear
          </button>
        </div>
      </form>

      {result && (
        <div className="mt-6">
          <PredictionResult model={modelName.toLowerCase()} data={result} />
        </div>
      )}
    </div>
  );
};
