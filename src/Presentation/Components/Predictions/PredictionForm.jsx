import Card from "@/Presentation/Components/Shared/UI/Card";
import Form from "@/Presentation/Components/Shared/UI/Form";
import { PredictionResult } from "@/Presentation/Components/Predictions/PredictionResult";

// Viser forudsigelsesformularen og håndterer indtastning og indsendelse
// af data til forudsigelse
// Denne komponent viser en formular til at indtaste data til forudsigelse

const PredictionForm = ({
  modelName,
  fields,
  formData,
  result,
  onChange,
  onSubmit,
  onClear,
}) => {

  // Funktion til at vise enten dropdown eller tekst/nummer input afhængigt af feltets rfc/logistiske type
  const renderField = (field) => {
    const value = formData[field.name] || "";
    const handleChange = (e) => onChange(field.name, e.target.value);

    // Hvis feltet har definerede valgmuligheder, vis som dropdown
    if (field.options) {
      return (
        <select
          key={field.name}
          name={field.name}
          value={value}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600"
        >
          <option value="">Vælg {field.placeholder}</option>
          {field.options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      );
    }

    // Standard inputfelt (tekst eller tal)
    return (
      <input
        key={field.name}
        type={field.type || "text"}
        name={field.name}
        placeholder={field.placeholder}
        value={value}
        onChange={handleChange}
        className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600"
      />
    );
  };

  
  return (
    <Card>
      <h2 className="text-2xl font-semibold mb-4 text-white">
        {modelName.toUpperCase()} Forudsigelse
      </h2>

      {/* Formularen håndterer indtastning og knapper */}
      <form onSubmit={onSubmit} onReset={onClear} className="space-y-4">
        {fields.map((field) => (
          <div key={field.name}>
            <label className="block mb-1 text-sm text-white">
              {field.placeholder}
            </label>
            {renderField(field)}
          </div>
        ))}

        {/* Knapper til at predict eller rydde formularen */}
        <div className="flex gap-4">
          <button type="submit" className="bg-green-600 px-4 py-2 rounded text-white">Forudsig</button>
          <button type="reset" className="bg-red-600 px-4 py-2 rounded text-white">Ryd</button>
        </div>

        {/* Hvis der er resultat, vis det nedenunder */}
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
