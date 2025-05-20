import React from 'react';
import { usePredictionFormViewModel } from '@/Presentation/Hooks/usePredictionFormViewModel';
import PredictionForm from '@/Presentation/Components/Predictions/PredictionForm';
import PageHeader from '@/Presentation/Layout/Headers/PageHeader';
import Footer from "@/Presentation/Layout/Footer/Footer";
import PredictionHistoryML from '@/Presentation/Components/Predictions/PredictionHistoryML'; 
import { useAuthViewModel } from "@/Presentation/Hooks/useAuthViewModel";

// Denne komponent renderer siden til at lave forudsigelser ved hjælp af en valgt model.
// Den indeholder en dropdown til at vælge model, et formular til at indtaste data og en sektion til at vise tidligere forudsigelser.
// Den bruger usePredictionFormViewModel til at håndtere logikken og dataene.
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

  // Henter bruger-id fra auth view model
  const { user } = useAuthViewModel();
  const userId = user?.userId;

  
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <main className="flex-grow p-8 max-w-4xl mx-auto w-full">
        <PageHeader title="Forudsigelser" />

        <div className="mb-6">
          <label className="block mb-1 text-sm text-white">Vælg model-fil:</label>
          <select
            value={modelName}
            onChange={(e) => setModelName(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
          >
            {availableModels.map((model) => (
              <option key={model} value={model}>{model}</option>
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
