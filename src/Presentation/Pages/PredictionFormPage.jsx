import React from 'react';
import { usePredictionFormViewModel } from '@/Presentation/Hooks/usePredictionFormViewModel';
import PredictionForm from '@/Presentation/Components/Predictions/PredictionForm';
import PageHeader from '@/Presentation/Layout/Headers/PageHeader';
import TwoColumnGrid from '@/Presentation/Layout/TwoColumnGrid';
import Footer from "@/Presentation/Layout/Footer/Footer";

/**
 * PredictionFormPage – Viser formularer til to forskellige ML-modeller (Logistic og RFC)
 * Brugeren kan indtaste data og få resultater vist direkte.
 */
const PredictionFormPage = () => {
  const { logistic, rfc } = usePredictionFormViewModel();

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      {/* Indhold */}
      <main className="flex-grow p-8 max-w-7xl mx-auto w-full">
        <PageHeader title="Forudsigelser" />

        {/* Formularer i to kolonner */}
        <TwoColumnGrid>
          <PredictionForm
            modelName="Logistic"
            fields={logistic.getFields()}
            formData={logistic.formData}
            result={logistic.result}
            onChange={logistic.handleChange}
            onSubmit={logistic.handleSubmit}
            onClear={logistic.handleClear}
          />

          <PredictionForm
            modelName="RFC"
            fields={rfc.getFields()}
            formData={rfc.formData}
            result={rfc.result}
            onChange={rfc.handleChange}
            onSubmit={rfc.handleSubmit}
            onClear={rfc.handleClear}
          />
        </TwoColumnGrid>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PredictionFormPage;
