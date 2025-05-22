import ModalHeader from "./ModalHeader";
import Button from "@/Presentation/Components/Shared/UI/Button";

/**
 * ModalActionBar – Header til modaler med titel og valgfri knapper (handlinger).
 * Knapper vises til højre og understøtter variant og klikfunktion.
 */
export default function ModalActionBar({ title, actions = [] }) {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
      {/* Titel i toppen af modal */}
      <ModalHeader title={title} />

      {/* Handlingsknapper (f.eks. 'Opret nyt', 'Gem', 'Annullér') */}
      <div className="flex flex-wrap gap-2 sm:gap-3 sm:justify-end">
        {actions.map(({ label, onClick, variant }) => (
          <Button
            key={label}
            label={label}
            onClick={onClick}
            variant={variant}
          />
        ))}
      </div>
    </div>
  );
}
