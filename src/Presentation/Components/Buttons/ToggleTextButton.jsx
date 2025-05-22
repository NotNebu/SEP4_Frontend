import Button from "@/Presentation/Components/Shared/UI/Button";

// Knap til at vise eller skjule ekstra tekst (f.eks. "Læs mere" / "Skjul")
export default function ToggleTextButton({ expanded, onClick, labels }) {
  return (
    <Button
      onClick={onClick}
      label={expanded ? labels.hide : labels.show}
      variant="outline"
      className="text-sm"
    />
  );
}
