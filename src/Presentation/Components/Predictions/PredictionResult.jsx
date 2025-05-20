import Card from "@/Presentation/Components/Shared/UI/Card";
import SectionHeader from "@/Presentation/Layout/Headers/SectionHeader";
import ErrorMessage from "@/Presentation/Components/Shared/UI/ErrorMessage";

// Viser resultatet af en forudsigelse afhængigt af indholdet
export const PredictionResult = ({ model, data }) => {
  const renderModelSpecific = () => {
    // Hvis resultatet har prediction og confidence
    if (data?.prediction && data?.confidence !== undefined) {
      return (
        <>
          <p><strong>Forudsigelse:</strong> {data.prediction}</p>
          <p><strong>Sikkerhed:</strong> {(data.confidence * 100).toFixed(2)}%</p>
        </>
      );
    }

    // Hvis resultatet har prediction og probabilities
    if (Array.isArray(data?.result) || typeof data?.result === "string") {
      return (
        <>
          <p><strong>Klassesandsynligheder:</strong></p>
          <div className="mt-2 text-sm bg-gray-800 p-2 rounded font-mono text-gray-100 max-h-40 overflow-y-auto">
            <pre>{typeof data.result === "string" ? data.result : JSON.stringify(data.result, null, 2)}</pre>
          </div>
        </>
      );
    }

    return null;
  };

  return (
    <Card className="bg-gray-900 text-white">
      <SectionHeader title="Forudsigelsesresultat" />
      <div className="space-y-2">
        <p><strong>Status:</strong> {data?.status}</p>
        <p><strong>Model:</strong> {data?.model_used}</p>
        <p><strong>Besked:</strong> {data?.message}</p>
        {renderModelSpecific()}
      </div>
    </Card>
  );
};

export default PredictionResult;
