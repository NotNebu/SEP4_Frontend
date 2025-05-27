import { useState } from "react";
import Button from "@/Presentation/Components/Shared/UI/Button";

/**
 * Genanvendelig dropdown-komponent med klikbare valgmuligheder.
 * Label og options overgives som props.
 */
export default function Dropdown({ label, options = [] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      {/* Dropdown-knap */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm flex items-center"
      >
        {label} <span className="ml-2">▾</span>
      </button>

      {/* Liste over valgmuligheder */}
      {open && (
        <div className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1">
            {options.map(({ label, onClick }) => (
              <Button
                onClick={() => setOpen((prev) => !prev)}
                label={
                  <span className="flex items-center">
                    {label} <span className="ml-2">▾</span>
                  </span>
                }
                variant="primary"
                type="button"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
