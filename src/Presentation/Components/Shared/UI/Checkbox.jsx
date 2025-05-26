// Genanvendelig checkbox-komponent med label
// Modtager label, navn, checked og onChange som props
export default function Checkbox({ label, name, checked, onChange }) {
  return (
    <label htmlFor={name} className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        id={name}
        name={name}
        className="accent-blue-500"
        checked={checked}
        onChange={onChange}
      />
      <span className="text-white">{label}</span>
    </label>
  );
}
