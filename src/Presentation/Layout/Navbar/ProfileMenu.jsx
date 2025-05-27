import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "@Shared/Context/AuthContext";
import Button from "@/Presentation/Components/Shared/UI/Button";

/**
 * ProfileMenu – Dropdown-menu i navbar til brugerhandlinger:
 * Profilvisning, eksperimenter og log ud.
 */
export default function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (_) {
      alert("Fejl ved logout.");
    }
  };

  const goToProfile = () => {
    navigate("/profile");
    setOpen(false);
  };

  const goToExperiments = () => {
    navigate("/profile", { state: { showExperiments: true } });
    setOpen(false);
  };

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
        <div className="absolute right-0 mt-2 w-52 bg-gray-800 dark:bg-gray-900 rounded-md shadow-lg z-100 overflow-hidden p-2 space-y-2">
          {user?.email && (
            <div className="px-2 py-1 text-xs text-gray-400 border-b border-gray-700 truncate">
              {user.email}
            </div>
          )}

          <Button
            label="Min profil"
            onClick={goToProfile}
            variant="secondary"
            fullWidth
          />

          <Button
            label="Mine eksperimenter"
            onClick={goToExperiments}
            variant="secondary"
            fullWidth
          />

          <Button
            onClick={handleLogout}
            label="Log ud"
            variant="danger"
            fullWidth
          />
        </div>
      )}
    </div>
  );
}
