import React from "react";
import Card from "@/Presentation/Components/Shared/UI/Card";
import Form from "@/Presentation/Components/Shared/UI/Form";
import { PredictionResult } from "@/Presentation/Components/Predictions/PredictionResult";

// Formular til at udføre en forudsigelse og vise resultatet
export const PredictionForm = ({
  modelName,
  fields,
  formData,
  result,
  onChange,
  onSubmit,
  onClear,
}) => {
  return (
    <Card>
      {/* Titel med modelnavn */}
      <h2 className="text-2xl font-semibold mb-4 text-white">
        {modelName} Forudsigelse
      </h2>

      {/* Dynamisk formular med felter og knapper */}
      <Form
        fields={fields}
        values={formData}
        onChangeValue={onChange}
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
              <PredictionResult model={modelName.toLowerCase()} data={result} />
            </div>
          )
        }
      />
    </Card>
  );
};

export default PredictionForm;
