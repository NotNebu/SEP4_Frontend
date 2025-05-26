import React from "react";
import Card from "@/Presentation/Components/Shared/UI/Card";
import ProgressBar from "@/Presentation/Components/Shared/UI/ProgressBar";
import DeviationText from "@Presentation/Components/Shared/DeviationText";

// Viser forudsigelse og faktisk måling for et eksperiment med afvigelse og fremdriftsindikator
const PredictionCard = ({ item }) => {
  const deviation = Math.abs(item.predicted - item.actual);
  const progress = Math.min((item.actual / item.predicted) * 100, 100);

  return (
    <Card className="hover:scale-[1.02] duration-200">
      {/* Titel og dato */}
      <h3 className="font-semibold text-xl mb-1">{item.experiment}</h3>
      <p className="text-sm text-gray-500">{item.date}</p>

      {/* Talvisning og afvigelse */}
      <div className="mt-4 space-y-1 text-base">
        <p>
          Forudsigelse: <span className="font-semibold">{item.predicted}</span>
        </p>
        <p>
          Målt: <span className="font-semibold">{item.actual}</span>
        </p>
        <DeviationText deviation={deviation} />

        {/* Fremdriftslinje */}
        <div className="mt-3">
          <ProgressBar percentage={progress} />
          <p className="text-xs text-gray-400 mt-1">
            Måling i forhold til forudsigelse
          </p>
        </div>
      </div>
    </Card>
  );
};

export default PredictionCard;
