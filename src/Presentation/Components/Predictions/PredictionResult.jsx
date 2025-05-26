import Card from "@/Presentation/Components/Shared/UI/Card";
import SectionHeader from "@/Presentation/Layout/Headers/SectionHeader";
import ErrorMessage from "@/Presentation/Components/Shared/UI/ErrorMessage";

// Dansk visningsnavn for model-filer
const modelNameMap = {
  "mylrmodel_v6_logistic_regression.joblib": "Logistisk Regression v6",
  "finalversion_logistic_regression.joblib": "Logistisk Regression v5",
  "logistiskregression_logistic_regression.joblib": "Logistisk Regression (Eksperimentel)",
  "randomforestregressor.joblib": "Random Forest v1",
  "randomforestregressor_20250510_160735.joblib": "Random Forest v2",
  "randomforestregressor_20250511_210430.joblib": "Random Forest v3",
};

// Dansk oversættelse af status
const statusMap = {
  success: "Succes",
  error: "Fejl",
};

// Oversæt tekniske beskeder til dansk
const translateMessage = (message) => {
  if (!message) return "";

  if (message.includes("Logistic Regression prediction")) {
    return "Logistisk regression forudsigelse blev gennemført.";
  }

  if (message.includes("Random Forest prediction")) {
    return "Random Forest forudsigelse blev gennemført.";
  }

  return message;
};

export const PredictionResult = ({ model, data }) => {
  const renderModelSpecific = () => {
    if (data?.prediction !== undefined && data?.confidence !== undefined) {
      return (
        <>
          <p>
            <strong>Forudsigelse:</strong> {data.prediction}
          </p>
          <p>
            <strong>Sikkerhed:</strong> {(data.confidence * 100).toFixed(2)}%
          </p>
        </>
      );
    }

    if (Array.isArray(data?.result) || typeof data?.result === "string") {
      return (
        <>
          <p>
            <strong>Klassesandsynligheder:</strong>
          </p>
          <div className="mt-2 text-sm bg-gray-800 p-2 rounded font-mono text-gray-100 max-h-40 overflow-y-auto">
            <pre>
              {typeof data.result === "string"
                ? data.result
                : JSON.stringify(data.result, null, 2)}
            </pre>
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
        <p>
          <strong>Status:</strong> {statusMap[data?.status] || data?.status}
        </p>
        <p>
          <strong>Model:</strong>{" "}
          {modelNameMap[data?.model_used?.toLowerCase()] || data?.model_used}
        </p>
        <p>
          <strong>Besked:</strong> {translateMessage(data?.message)}
        </p>
        {renderModelSpecific()}
      </div>
    </Card>
  );
};

export default PredictionResult;
