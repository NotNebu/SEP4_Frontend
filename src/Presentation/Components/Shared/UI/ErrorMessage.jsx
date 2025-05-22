/**
 * ErrorMessage – Viser en fejl- eller succesbesked baseret på variant.
 * @param {string} message - Beskeden der skal vises.
 * @param {"error"|"success"} variant - Typen af besked (standard: "error").
 */
export default function ErrorMessage({ message, variant = "error" }) {
  if (!message) return null;

  const textColor = variant === "success" ? "text-green-500" : "text-red-500";

  return <p className={`${textColor} mb-2`}>{message}</p>;
}
