import { calculatePasswordStrength } from "@/Presentation/Utils/PasswordHelper";

// Viser krav til adgangskode og vurderer styrken baseret på opfyldte regler
export default function PasswordStrengthMeter({ password }) {
  const { strength, requirements, label, color } = calculatePasswordStrength(password);

  return (
    <div className="mt-4 space-y-2">
      {/* Progressbar */}
      <div className="h-2 rounded bg-gray-700 overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ${color}`}
          style={{ width: `${(strength / 5) * 100}%` }}
        />
      </div>

      {/* Styrketekst */}
      <p className="text-sm text-white">Styrke: {label}</p>

      {/* Krav */}
      <ul className="text-sm space-y-1">
        {requirements.map((req, i) => (
          <li key={i} className={req.isValid ? "text-green-400" : "text-red-400"}>
            {req.isValid ? "✓" : "✗"} {req.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
