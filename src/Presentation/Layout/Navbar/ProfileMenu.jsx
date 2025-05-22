import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "@Shared/Context/AuthContext";

/**
 * ProfileMenu – Dropdown-menu i navbar til brugerhandlinger:
 * Profilvisning, eksperimenter og log ud.
 */
export default function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  // Logger brugeren ud og går til login
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error("Fejl ved logout:", err);
    }
  };

  // Luk dropdown hvis der klikkes udenfor
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      {/* Knap med brugerikon */}
      <button
        onClick={() => setOpen(!open)}
        className="text-gray-300 hover:text-orange-500 text-4xl"
        aria-label="Brugerprofilmenu"
      >
        <FaUserCircle />
      </button>

      {/* Dropdown-menuen */}
      {open && (
        <div className="absolute right-0 mt-2 w-52 bg-gray-800 dark:bg-gray-900 rounded-md shadow-lg z-50 overflow-hidden">
          {/* Viser brugerens email */}
          {user?.email && (
            <div className="px-4 py-2 text-xs text-gray-400 border-b border-gray-700 truncate">
              {user.email}
            </div>
          )}

          {/* Link til profil */}
          <Link
            to="/profile"
            onClick={() => setOpen(false)}
            className="block px-4 py-2 text-sm text-gray-300 hover:text-orange-500"
          >
            Min profil
          </Link>

          {/* Link til eksperimenter */}
          <Link
            to="/profile"
            state={{ showExperiments: true }}
            onClick={() => setOpen(false)}
            className="block px-4 py-2 text-sm text-gray-300 hover:text-orange-500"
          >
            Mine eksperimenter
          </Link>

          {/* Log ud-knap */}
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-red-500"
          >
            Log ud
          </button>
        </div>
      )}
    </div>
  );
}
