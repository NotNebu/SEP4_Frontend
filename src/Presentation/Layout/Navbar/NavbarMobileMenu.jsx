import { Link } from "react-router-dom";
import Button from "@/Presentation/Components/Shared/UI/Button";

/**
 * NavbarMobileMenu – Viser mobilvenlig menu under navbar.
 * Indeholder navigation og brugerrelaterede links.
 */
export default function NavbarMobileMenu({ open, setOpen, onLogout }) {
  if (!open) return null;

  return (
    <div className="sm:hidden absolute top-16 left-0 w-full z-50 bg-gray-800 dark:bg-gray-900 px-4 pt-4 pb-6 space-y-3 shadow-lg">
      {/* Navigationslinks */}
      <Link
        to="/"
        onClick={() => setOpen(false)}
        className="block text-gray-300 hover:text-orange-500 text-lg"
      >
        Dashboard
      </Link>

      <Link
        to="/prediction-form"
        onClick={() => setOpen(false)}
        className="block text-gray-300 hover:text-orange-500 text-lg"
      >
        Forudsigelse
      </Link>

      <Link
        to="/create-experiment"
        onClick={() => setOpen(false)}
        className="block text-gray-300 hover:text-orange-500 text-lg"
      >
        Opret Eksperiment
      </Link>

      {/* Divider før bruger-links */}
      <hr className="border-t border-gray-700 my-2" />

      {/* Brugerrelaterede links */}
      <Link
        to="/profile"
        onClick={() => setOpen(false)}
        className="block text-gray-300 hover:text-orange-500 text-lg"
      >
        Min profil
      </Link>

      <Link
        to="/profile"
        state={{ showExperiments: true }}
        onClick={() => setOpen(false)}
        className="block text-gray-300 hover:text-orange-500 text-lg"
      >
        Mine eksperimenter
      </Link>

      {/* Log ud-knap */}
      <Button
        onClick={() => {
          onLogout();
          setOpen(false);
        }}
        label="Log ud"
        variant="danger"
        fullWidth
      />
    </div>
  );
}
