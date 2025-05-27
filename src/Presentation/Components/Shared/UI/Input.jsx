
// Genanvendelig input-komponent med label og validering
// Modtager label, navn, type, value, onChange, placeholder, variant og error som props
export default function Input({
  label,
  name,
  type = "text",
  value,
  onChange,
  onChangeValue,
  placeholder,
  variant = "default",
  error,
}) {
  const handleInputChange = (e) => {
    if (onChangeValue) {
      onChangeValue(e.target.value);
    } else if (onChange) {
      onChange(e);
    }
  };

  const baseClasses = `
    w-full px-3 py-2
    border rounded-lg
    focus:outline-none focus:ring-2
    transition
  `;

  const variants = {
    default: `
      bg-gray-800 text-white border-gray-700
      focus:ring-blue-500
    `,
    auth: `
      rounded-full pl-10 pr-4 py-2
      bg-white/10 border border-white/30
      text-white placeholder-gray-300
      focus:ring-pink-500
    `,
  };

  const errorClass = error ? "border-red-500 focus:ring-red-500" : "";

  return (
    <div className="space-y-1">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-300"
        >
          {label}
        </label>
      )}

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        className={`${baseClasses} ${variants[variant]} ${errorClass}`}
      />

      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}
