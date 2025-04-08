/**
 * Genanvendelig knapkomponent.
 *
 * @component
 * @param {Object} props - Komponentens props
 * @param {string} props.label - Tekst der vises inde i knappen
 * @param {function} props.onClick - Funktion der kaldes ved klik på knappen
 * @param {string} [props.type="button"] - HTML-knappens type (f.eks. "submit" eller "button")
 * @returns {JSX.Element} En stiliseret knap
 */
const Button = ({ label, onClick, type = "button" }) => {
    return (
      <button
        type={type}
        onClick={onClick}
        className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 shadow-md transition transform hover:-translate-y-0.5"
      >
        {label}
      </button>
    );
  };
  
  export default Button;
  