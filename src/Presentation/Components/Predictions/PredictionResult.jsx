import Card from "@/Presentation/Components/Shared/UI/Card";
import SectionHeader from "@/Presentation/Layout/Headers/SectionHeader";
import ErrorMessage from "@/Presentation/Components/Shared/UI/ErrorMessage";

// Viser resultatet af en forudsigelse afhængigt af valgt modeltype
export const PredictionResult = ({ model, data }) => {
  const renderModelSpecific = () => {
    if (model === "logistic") {
      // Resultat for logistisk regression
      return (
        <>
          <p><strong>Forudsigelse:</strong> {data.prediction}</p>
          <p><strong>Sikkerhed:</strong> {(data.confidence * 100).toFixed(2)}%</p>
        </>
      );
    }

    if (model === "rfc") {
      // Resultat for Random Forest (klasse-sandsynligheder)
      return (
        <>
          <p><strong>Klassesandsynligheder:</strong></p>
          <div className="mt-2 text-sm bg-gray-800 p-2 rounded font-mono text-gray-100 max-h-40 overflow-y-auto">
            <pre>{JSON.stringify(data.result, null, 2)}</pre>
          </div>
        </>
      );
    }

    // Ukendt modeltype
    return <ErrorMessage message="Ukendt modeltype valgt." />;
  };

  return (
    <Card className="bg-gray-900 text-white">
      {/* Sektionstitel */}
      <SectionHeader title="Forudsigelsesresultat" />

      {/* Almindelig visning af fælles resultatinformation */}
      <div className="space-y-2">
        <p><strong>Status:</strong> {data.status}</p>
        <p><strong>Model:</strong> {data.model_used}</p>
        <p><strong>Besked:</strong> {data.message}</p>
        {renderModelSpecific()}
      </div>
    </Card>
  );
};

export default PredictionResult;
