/**
 * Card – Genanvendelig container-komponent med forskellige visuelle varianter.
 * Indholdet (children) defineres udefra.
 */
export default function Card({ children, className = "", variant = "default" }) {
  // Definer visuelle varianter
  const variants = {
    default: "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm",
    auth: "backdrop-blur-md bg-white/10 border border-white/20 text-white shadow-2xl",
  };

  return (
    <div className={`rounded-xl p-6 ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
}
