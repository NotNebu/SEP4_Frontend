/**
 * Genanvendelig input-komponent med label.
 *
 * @component
 * @param {Object} props - Komponentens props
 * @param {string} props.label - Tekst til label ovenfor inputfeltet
 * @param {string} [props.type="text"] - Inputtype (fx "text", "email", "password" osv.)
 * @param {string} props.value - Den aktuelle værdi i inputfeltet
 * @param {function} props.onChange - Event handler som håndterer inputændringer
 * @param {string} props.placeholder - Pladsholdertekst der vises i inputfeltet
 * @returns {JSX.Element} Et stiliseret inputfelt med label
 */
const Input = ({ label, type = "text", value, onChange, placeholder }) => {
    return (
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>
    );
  };
  
  export default Input;
  