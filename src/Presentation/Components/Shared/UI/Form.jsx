// components/ui/Form.jsx
import Input from "./Input";
import Button from "./Button";

export default function Form({
  fields = [],
  values = {},
  onChange,
  onSubmit,
  onReset,
  showButtons = false,
  submitLabel = "Gem",
  resetLabel = "Nulstil",
  submitVariant = "primary",
  resetVariant = "secondary",
  childrenAfter = null,
}) {
  const handleChange = (name, event) => {
    if (event?.target && !event.target.name) {
      event.target.name = name;
    }
    if (onChange) {
      onChange(event);
    }
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
          onChange={(e) => handleChange(name, e)}
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
