import React from "react";
import { usePredictionFormViewModel } from "@/Presentation/Hooks/usePredictionFormViewModel";
import PredictionForm from "@/Presentation/Components/Predictions/PredictionForm";
import PageHeader from "@/Presentation/Layout/Headers/PageHeader";
import Footer from "@/Presentation/Layout/Footer/Footer";
import PredictionHistoryML from "@/Presentation/Components/Predictions/PredictionHistoryML";
import { useAuthViewModel } from "@/Presentation/Hooks/useAuthViewModel";

// Manuel navngivning af model-filer
const modelNameMap = {
  "mylrmodel_v6_logistic_regression.joblib": "Logistisk Regression v6",
  "finalversion_logistic_regression.joblib": "Logistisk Regression v5",
  "logistiskregerssion_logistic_regression.joblib":
    "Logistisk Regression (Eksperimentel)",
  "randomforestregressor.joblib": "Random Forest v1",
  "randomforestregressor_20250510_160735.joblib": "Random Forest v2",
  "randomforestregressor_20250511_210430.joblib": "Random Forest v3",
};

const PredictionFormPage = () => {
  const {
    modelName,
    setModelName,
    modelType,
    availableModels,
    refreshTrigger,
    formData,
    result,
    handleChange,
    handleSubmit,
    handleClear,
    getFields,
  } = usePredictionFormViewModel();

  const { user } = useAuthViewModel();
  const userId = user?.userId;

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <main className="flex-grow p-8 max-w-4xl mx-auto w-full">
        <PageHeader title="Forudsigelser" />

        <div className="mb-6">
          <label className="block mb-1 text-sm text-white">
            Vælg model-fil:
          </label>
          <select
            value={modelName}
            onChange={(e) => setModelName(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
          >
            <option value="">-- Vælg en model --</option>
            {availableModels.map((model) => (
              <option key={model} value={model}>
                {modelNameMap[model.toLowerCase()] || model}
              </option>
            ))}
          </select>
        </div>

        <PredictionForm
          modelName={modelName}
          fields={getFields()}
          formData={formData}
          result={result}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onClear={handleClear}
        />

        <PredictionHistoryML userId={userId} refreshTrigger={refreshTrigger} />
      </main>
      <Footer />
    </div>
  );
};

export default PredictionFormPage;
