/**
 * EmptyStateMessage – Viser en simpel besked, når der ikke er noget indhold.
 * F.eks. "Ingen data tilgængelig." eller "Du har ingen eksperimenter endnu."
 */
export default function EmptyStateMessage({ message }) {
  return <p className="text-white">{message}</p>;
}
