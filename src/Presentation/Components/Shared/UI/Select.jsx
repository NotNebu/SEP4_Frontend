// Genanvendelig select/dropdown-komponent med label og validering
// Modtager label, navn, value, onChange, options, placeholder, variant og error som props
export default function Select({
  label,
  name,
  value,
  onChange,
  options,
  placeholder,
  variant = "default",
  error,
}) {
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

      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={`${baseClasses} ${variants[variant]} ${errorClass}`}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}
