import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@Shared/Context/AuthContext.jsx";
import NavbarBrand from "./NavbarBrand";
import NavbarLinks from "./NavbarLinks";
import NavbarMobileMenu from "./NavbarMobileMenu";
import NavbarHamburger from "./NavbarHamburger";
import ProfileMenu from "./ProfileMenu";

/**
 * Navbar – Topnavigation med brand, links og brugerprofil.
 * Skifter mellem desktop og mobilmenu afhængigt af skærmstørrelse.
 */
const Navbar = () => {
  const [selected, setSelected] = useState("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Logger brugeren ud og sender tilbage til login
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error("Fejl ved logout:", err);
    }
  };

  // Skjul navbar hvis ikke logget ind
  if (!user) return null;

  return (
    <nav className="bg-gray-900 text-white dark:bg-gray-950 shadow-md w-full relative">
      <div className="h-16 flex items-center w-full px-4 sm:px-6 lg:px-8 relative">
        {/* Brand/logo til venstre */}
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
          <NavbarBrand />
        </div>

        {/* Navigation-links centreret (kun på desktop) */}
        <div className="hidden sm:flex mx-auto items-center space-x-6">
          <NavbarLinks
            selected={selected}
            setSelected={setSelected}
            setDropdownOpen={setIsDropdownOpen}
          />
        </div>

        {/* Profilmenu til højre (kun på desktop) */}
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 hidden sm:flex items-center">
          <ProfileMenu />
        </div>

        {/* Hamburger til mobilmenu */}
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 sm:hidden">
          <NavbarHamburger
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </div>
      </div>

      {/* Mobilmenu vises under navbar */}
      <NavbarMobileMenu
        open={isMobileMenuOpen}
        setOpen={setIsMobileMenuOpen}
        onLogout={handleLogout}
      />
    </nav>
  );
};

export default Navbar;
