import React from 'react';

export const PredictionResult = ({ model, data }) => {
  return (
    <div className="mt-6 bg-gray-900 p-4 rounded-xl shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Prediction Result</h2>

      <div className="space-y-2">
        <p><strong>Status:</strong> {data.status}</p>
        <p><strong>Model Used:</strong> {data.model_used}</p>
        <p><strong>Message:</strong> {data.message}</p>

        {model === 'logistic' && (
          <>
            <p><strong>Prediction:</strong> {data.prediction}</p>
            <p><strong>Confidence:</strong> {(data.confidence * 100).toFixed(2)}%</p>
          </>
        )}

        {model === 'rfc' && (
          <>
            <p><strong>Class Probabilities:</strong></p>
            <ul className="list-disc list-inside ml-4">
              {data.result?.map((prob, idx) => (
                <li key={idx}>Class {idx}: {(prob * 100).toFixed(2)}%</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};
