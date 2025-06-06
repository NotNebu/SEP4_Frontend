import { Link, useLocation } from "react-router-dom";

/**
 * NavbarLinks – Navigationselementer til både desktop og mobil.
 * Håndterer aktiv tilstand og lukning af mobilmenu ved klik.
 */
export default function NavbarLinks({
  selected,
  setSelected,
  setDropdownOpen,
  isMobile = false,
  onCloseMobile,
}) {
  const location = useLocation();
  const pathname = location.pathname;

  // Deaktiver aktiv-styling på profilsider
  const isProfilePage = pathname.startsWith("/profile");

  return (
    <>
      {/* Dashboard-link */}
      <Link
        to="/"
        onClick={() => {
          setSelected("dashboard");
          if (isMobile) onCloseMobile?.();
        }}
        className={`block py-2 ${
          isMobile
            ? "text-gray-300 hover:text-orange-500"
            : `hover:text-orange-500 ${
                !isProfilePage && selected === "dashboard"
                  ? "text-orange-500 font-medium"
                  : "text-gray-300"
              }`
        }`}
      >
        Dashboard
      </Link>

      {/* Forudsigelse-link */}
      <Link
        to="/prediction-form"
        onClick={() => {
          setSelected("prediction-form");
          if (isMobile) onCloseMobile?.();
        }}
        className={`block py-2 ${
          isMobile
            ? "text-gray-300 hover:text-orange-500"
            : `hover:text-orange-500 ${
                !isProfilePage && selected === "prediction-form"
                  ? "text-orange-500 font-medium"
                  : "text-gray-300"
              }`
        }`}
      >
        Forudsigelse
      </Link>

      {/* Opret Eksperiment-link */}
      <Link
        to="/create-experiment"
        onClick={() => {
          setSelected("create-experiment");
          if (isMobile) onCloseMobile?.();
        }}
        className={`block py-2 ${
          isMobile
            ? "text-gray-300 hover:text-orange-500"
            : `hover:text-orange-500 ${
                !isProfilePage && selected === "create-experiment"
                  ? "text-orange-500 font-medium"
                  : "text-gray-300"
              }`
        }`}
      >
        Opret Eksperiment
      </Link>
    </>
  );
}
