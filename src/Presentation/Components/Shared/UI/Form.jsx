import { useState } from "react";
import Input from "./Input";
import Button from "./Button";

/**
 * En genanvendelig Form-komponent.
 * Understøtter både forms med og uden submit/reset knapper.
 * Understøtter også validering pr. felt hvis `validate`-funktion er angivet.
 */
export default function Form({
  fields = [],
  values = {},
  onChange,
  onChangeValue,
  onSubmit,
  onReset,
  showButtons = false,
  submitLabel = "Gem",
  resetLabel = "Nulstil",
  submitVariant = "primary",
  resetVariant = "secondary",
  childrenAfter = null,
}) {
  const [errors, setErrors] = useState({});

  const handleChange = (name, valueOrEvent) => {
    const value =
      valueOrEvent?.target?.value !== undefined
        ? valueOrEvent.target.value
        : valueOrEvent;

    // Valider felt, hvis feltet har en validate-funktion
    const field = fields.find((f) => f.name === name);
    const error = field?.validate?.(value) || null;
    setErrors((prev) => ({ ...prev, [name]: error }));

    if (onChange) onChange(name, value);
    if (onChangeValue) onChangeValue(name, value);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {fields.map(({ name, label, type = "text", placeholder }) => (
        <Input
          key={name}
          label={label || placeholder}
          name={name}
          type={type}
          placeholder={placeholder}
          value={values[name] || ""}
          error={errors[name]} // 👈 vis fejl i input
          onChange={(e) => handleChange(name, e)}
          onChangeValue={(val) => handleChange(name, val)}
        />
      ))}

      {showButtons && (
        <div className="flex gap-4 mt-4">
          <Button type="submit" label={submitLabel} variant={submitVariant} />
          <Button type="button" label={resetLabel} variant={resetVariant} onClick={onReset} />
        </div>
      )}

      {childrenAfter}
    </form>
  );
}