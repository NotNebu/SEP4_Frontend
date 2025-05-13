import React from 'react';
import { usePredictionFormViewModel } from '@Presentation/Features/Prediction/PredictionFormViewModel';
import { PredictionFormPanel } from '@Presentation/Features/Prediction/PredictionFormPanel';

const PredictionFormPage = () => {
  const {
    logistic,
    rfc
  } = usePredictionFormViewModel();

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-8 text-center">🌱 Prediction Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <PredictionFormPanel
          modelName="Logistic"
          fields={logistic.getFields()}
          formData={logistic.formData}
          result={logistic.result}
          onChange={logistic.handleChange}
          onSubmit={logistic.handleSubmit}
          onClear={logistic.handleClear}
        />

        <PredictionFormPanel
          modelName="RFC"
          fields={rfc.getFields()}
          formData={rfc.formData}
          result={rfc.result}
          onChange={rfc.handleChange}
          onSubmit={rfc.handleSubmit}
          onClear={rfc.handleClear}
        />
      </div>
    </div>
  );
};

export default PredictionFormPage;
