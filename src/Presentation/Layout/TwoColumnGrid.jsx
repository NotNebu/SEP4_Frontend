/**
 * TwoColumnGrid – Layout-komponent med én kolonne på mobil og to på desktop.
 * Bruges til at placere formularer, sektioner eller kort side om side.
 */
export default function TwoColumnGrid({ children }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">{children}</div>
  );
}
