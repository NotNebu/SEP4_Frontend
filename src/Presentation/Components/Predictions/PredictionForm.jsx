import Card from "@/Presentation/Components/Shared/UI/Card";
import Form from "@/Presentation/Components/Shared/UI/Form";
import Input from "@/Presentation/Components/Shared/UI/Input";
import Button from "@/Presentation/Components/Shared/UI/Button";
import { PredictionResult } from "@/Presentation/Components/Predictions/PredictionResult";

// Visningsnavne for model-filer
const modelNameMap = {
  "mylrmodel_v6_logistic_regression.joblib": "Logistisk Regression v6",
  "finalversion_logistic_regression.joblib": "Logistisk Regression v5",
  "logistiskregression_logistic_regression.joblib":
    "Logistisk Regression (Eksperimentel)",
  "randomforestregressor.joblib": "Random Forest v1",
  "randomforestregressor_20250510_160735.joblib": "Random Forest v2",
  "randomforestregressor_20250511_210430.joblib": "Random Forest v3",
};

// Oversættelser
const fieldPlaceholderMap = {
  "Soil Type": "Jordtype",
  "Water Frequency": "Vandingsfrekvens",
  "Fertilizer Type": "Gødningstype",
  "Sunlight Hours": "Solskinstimer",
  Temperature: "Temperatur",
  Humidity: "Luftfugtighed",
};

const optionLabelMap = {
  loam: "Muldjord",
  sandy: "Sandjord",
  clay: "Lerjord",
  daily: "Dagligt",
  weekly: "Ugentligt",
  "bi-weekly": "Hver 14. dag",
  chemical: "Kemisk",
  organic: "Organisk",
  none: "Ingen",
};

export default function PredictionForm({
  modelName,
  fields,
  formData,
  result,
  onChange,
  onSubmit,
  onClear,
}) {
  const formattedFields = fields
    .filter((field) => !field.options)
    .map((field) => ({
      name: field.name,
      type: field.type || "text",
      label: fieldPlaceholderMap[field.placeholder] || field.placeholder,
      placeholder: fieldPlaceholderMap[field.placeholder] || field.placeholder,
    }));

  const renderSelectFields = () =>
    fields
      .filter((field) => field.options)
      .map((field) => {
        const value = formData[field.name] || "";
        const placeholder =
          fieldPlaceholderMap[field.placeholder] || field.placeholder;

        return (
          <div key={field.name}>
            <label className="block mb-1 text-sm text-white">
              {placeholder}
            </label>
            <select
              name={field.name}
              value={value}
              onChange={(e) => onChange(field.name, e.target.value)}
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600"
            >
              <option value="">Vælg {placeholder}</option>
              {field.options.map((opt) => (
                <option key={opt} value={opt}>
                  {optionLabelMap[opt] || opt}
                </option>
              ))}
            </select>
          </div>
        );
      });

  return (
    <Card>
      <h2 className="text-2xl font-semibold mb-4 text-white">
        {modelNameMap[modelName.toLowerCase()] ||
          modelName.replace(".joblib", "")}{" "}
        Forudsigelse
      </h2>

      {/* Dropdowns */}
      <div className="space-y-4">{renderSelectFields()}</div>

      {/* Fælles form til tekstfelter */}
      <Form
        fields={formattedFields}
        values={formData}
        onChange={onChange}
        onSubmit={onSubmit}
        onReset={onClear}
        showButtons
        submitLabel="Forudsig"
        resetLabel="Ryd"
        submitVariant="success"
        resetVariant="danger"
        childrenAfter={
          result && (
            <div className="mt-6">
              <PredictionResult model={modelName} data={result} />
            </div>
          )
        }
      />
    </Card>
  );
}
