/**
 * ErrorMessage – Viser en rød fejlbesked, hvis en besked er angivet.
 * Teksten leveres udefra.
 */
export default function ErrorMessage({ message }) {
  if (!message) return null;
  return <p className="text-red-500 mb-2">{message}</p>;
}
