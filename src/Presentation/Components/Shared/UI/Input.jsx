/**
 * Input – Genanvendeligt inputfelt med understøttelse af forskellige varianter og ændringshåndtering.
 * Tekster (label og placeholder) leveres udefra.
 */
export default function Input({
  label,                // Label ved feltet (fx "Brugernavn")
  name,                 // Unik input-name og id
  type = "text",        // Input-type: "text", "email", "password", "date", osv.
  value,                // Nuvarande værdi
  onChange,             // Alternativ onChange handler (evt. til hele eventet)
  onChangeValue,        // Primær handler: kaldes med e.target.value
  placeholder,          // Placeholder tekst (fx "Indtast navn...")
  variant = "default",  // Visuel stil: "default" eller "auth"
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
    `
  };

  return (
    <div className="space-y-1">
      {/* Label vises hvis angivet */}
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-300">
          {label}
        </label>
      )}

      {/* Selve inputfeltet */}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        className={`${baseClasses} ${variants[variant]}`}
      />
    </div>
  );
}