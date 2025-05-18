/**
 * Returnerer en vurdering af adgangskodens styrke.
 * @param {string} password
 * @returns {{
 *   strength: number,
 *   requirements: { label: string, isValid: boolean }[],
 *   label: string,
 *   color: string
 * }}
 */
export function calculatePasswordStrength(password) {
  const requirements = [
    { label: "Mindst 8 tegn", isValid: password.length >= 8 },
    { label: "Mindst ét stort bogstav", isValid: /[A-Z]/.test(password) },
    { label: "Mindst ét lille bogstav", isValid: /[a-z]/.test(password) },
    { label: "Mindst ét tal", isValid: /\d/.test(password) },
    { label: "Mindst ét symbol", isValid: /[\W_]/.test(password) },
  ];

  const strength = requirements.filter((r) => r.isValid).length;

  const labelAndColor = [
    { label: "Svagt", color: "bg-red-500" },
    { label: "Svagt", color: "bg-red-500" },
    { label: "Svagt", color: "bg-red-500" },
    { label: "Middel", color: "bg-yellow-500" },
    { label: "Middel", color: "bg-yellow-500" },
    { label: "Stærkt", color: "bg-green-500" },
  ][strength];

  return {
    strength,
    requirements,
    ...labelAndColor,
  };
}
