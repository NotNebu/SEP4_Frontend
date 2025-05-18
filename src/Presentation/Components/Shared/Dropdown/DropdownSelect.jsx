/**
 * Genanvendelig select/dropdown-komponent.
 * Label og valgmuligheder modtages som props.
 */
export default function DropdownSelect({ label, value, onChange, options = [] }) {
  return (
    <div>
      {/* Vis label hvis angivet */}
      {label && <label className="block mb-2 font-semibold text-lg">{label}</label>}

      {/* Dropdown med valgmuligheder */}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="p-2 rounded border dark:bg-gray-800 dark:text-white"
      >
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}
