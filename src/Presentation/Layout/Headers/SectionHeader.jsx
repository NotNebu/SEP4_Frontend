/**
 * SectionHeader – Underoverskrift til sektioner i UI.
 * Bruges under hovedtitel til fx kort, tabeller eller formularer.
 */
export default function SectionHeader({ title, className = "" }) {
  return (
    <h2 className={`text-2xl font-bold mb-6 ${className}`}>
      {title}
    </h2>
  );
}
