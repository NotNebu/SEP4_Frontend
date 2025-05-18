/**
 * getDeviationColor – Returnerer farveklasse baseret på afvigelse.
 *
 * @param {number} diff - Afvigelsen mellem forudsigelse og faktisk værdi
 * @returns {string} - Tailwind farveklasse (grøn, gul eller rød)
 */
export const getDeviationColor = (diff) => {
  if (diff <= 2) return "text-green-500";      // Lille afvigelse
  if (diff <= 5) return "text-yellow-500";     // Moderat afvigelse
  return "text-red-500";                       // Stor afvigelse
};
