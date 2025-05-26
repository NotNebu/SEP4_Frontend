/**
 * Genanvendelig knap-komponent med forskellige visuelle varianter og breddevalg.
 * Understøtter dansk label-tekst via `label`-prop.
 */
const Button = ({
  label, // Teksten på knappen (fx "Gem", "Slet")
  onClick, // Hvad der skal ske ved klik
  type = "button", // HTML type: 'button', 'submit', 'reset'
  variant = "primary", // Visuelt tema: 'primary', 'secondary', 'success', 'danger', 'outline'
  fullWidth = false, // Om knappen skal fylde hele bredden
  disabled = false, // Om knappen er deaktiveret
}) => {
  // Basis-styling gælder for alle varianter
  const base =
    "py-2 px-4 font-semibold rounded-lg shadow-md transition transform hover:-translate-y-0.5 disabled:opacity-50";

  // Forskellige visuelle stilarter
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-700 text-white hover:bg-gray-600",
    success: "bg-green-600 text-white hover:bg-green-700",
    danger: "bg-red-600 text-white hover:bg-red-700",
    outline:
      "bg-transparent text-white border border-white hover:bg-white hover:text-black",
  };

  // Samlede klasser afhængigt af valgt variant og bredde
  const classes = `${base} ${variants[variant]} ${fullWidth ? "w-full" : ""}`;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {label}
    </button>
  );
};

export default Button;
