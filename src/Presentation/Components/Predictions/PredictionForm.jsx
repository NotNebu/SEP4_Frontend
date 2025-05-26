import Card from "@/Presentation/Components/Shared/UI/Card";
import Form from "@/Presentation/Components/Shared/UI/Form";
import { PredictionResult } from "@/Presentation/Components/Predictions/PredictionResult";

// Visningsnavne for model-filer
const modelNameMap = {
  "mylrmodel_v6_logistic_regression.joblib": "Logistisk Regression v6",
  "finalversion_logistic_regression.joblib": "Logistisk Regression v5",
  "logistiskregression_logistic_regression.joblib": "Logistisk Regression (Eksperimentel)",
  "randomforestregressor.joblib": "Random Forest v1",
  "randomforestregressor_20250510_160735.joblib": "Random Forest v2",
  "randomforestregressor_20250511_210430.joblib": "Random Forest v3",
};

// Oversættelser af placeholder-felter
const fieldPlaceholderMap = {
  "Soil Type": "Jordtype",
  "Water Frequency": "Vandingsfrekvens",
  "Fertilizer Type": "Gødningstype",
  "Sunlight Hours": "Solskinstimer",
  "Temperature": "Temperatur",
  "Humidity": "Luftfugtighed",
};

// Oversættelser af dropdown-option værdier
const optionLabelMap = {
  // Jordtyper
  loam: "Muldjord",
  sandy: "Sandjord",
  clay: "Lerjord",

  // Vandingsfrekvens
  daily: "Dagligt",
  weekly: "Ugentligt",
  "bi-weekly": "Hver 14. dag",

  // Gødningstype
  chemical: "Kemisk",
  organic: "Organisk",
  none: "Ingen",
};

const PredictionForm = ({
  modelName,
  fields,
  formData,
  result,
  onChange,
  onSubmit,
  onClear,
}) => {
  const renderField = (field) => {
    const value = formData[field.name] || "";
    const handleChange = (e) => onChange(field.name, e.target.value);
    const placeholder = fieldPlaceholderMap[field.placeholder] || field.placeholder;

    if (field.options) {
      return (
        <select
          key={field.name}
          name={field.name}
          value={value}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600"
        >
          <option value="">Vælg {placeholder}</option>
          {field.options.map((opt) => (
            <option key={opt} value={opt}>
              {optionLabelMap[opt] || opt}
            </option>
          ))}
        </select>
      );
    }

    return (
      <input
        key={field.name}
        type={field.type || "text"}
        name={field.name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600"
      />
    );
  };

  return (
    <Card>
      <h2 className="text-2xl font-semibold mb-4 text-white">
        {modelNameMap[modelName.toLowerCase()] || modelName.replace(".joblib", "")} Forudsigelse
      </h2>

      <form onSubmit={onSubmit} onReset={onClear} className="space-y-4">
        {fields.map((field) => {
          const placeholder = fieldPlaceholderMap[field.placeholder] || field.placeholder;

          return (
            <div key={field.name}>
              <label className="block mb-1 text-sm text-white">{placeholder}</label>
              {renderField(field)}
            </div>
          );
        })}

        <div className="flex gap-4 mt-4">
          <button type="submit" className="bg-green-600 px-4 py-2 rounded text-white">
            Forudsig
          </button>
          <button type="reset" className="bg-red-600 px-4 py-2 rounded text-white">
            Ryd
          </button>
        </div>

        {result && (
          <div className="mt-6">
            <PredictionResult model={modelName} data={result} />
          </div>
        )}
      </form>
    </Card>
  );
};

export default PredictionForm;
