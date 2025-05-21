/**
 * Input – Genanvendeligt inputfelt med støtte for forskellige varianter.
 */
export default function Input({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  variant = "default",
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
      rounded-full pl-10 pr-4 py-2 
      bg-white/10 border border-white/30 
      text-white placeholder-gray-300 
      focus:ring-pink-500
    `
  };

  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-300">
          {label}
        </label>
      )}

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange} // 🔥 KUN denne
        placeholder={placeholder}
        className={`${baseClasses} ${variants[variant]}`}
      />
    </div>
  );
}
