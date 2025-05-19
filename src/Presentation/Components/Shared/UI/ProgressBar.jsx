/**
 * ProgressBar – Viser en visuel fremdriftslinje baseret på procentværdi.
 * Farve og bredde styres via props.
 */
export default function ProgressBar({ percentage, color = "bg-blue-500" }) {
  return (
    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700">
      <div
        className={`h-full ${color} rounded-full transition-all duration-300`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
