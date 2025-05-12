import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@Shared/Context/AuthContext.jsx";

/**
 * Navbar-komponenten giver navigationsmuligheder for brugeren.
 * Indeholder links til Dashboard, Forsøg, Profil og Logout.
 *
 * @returns {JSX.Element}
 */
const Navbar = () => {
  const [selected, setSelected] = useState("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { user, logout } = useAuth(); 
  const navigate = useNavigate();

  const isLoggedIn = !!user;

  const handleLogout = async () => {
    try {
      await logout(); 
      navigate("/login"); 
    } catch (error) {
      console.error("Fejl ved logout:", error);
    }
  };


  if (!isLoggedIn) return null;

  return (
    <nav className="bg-gray-900 text-white dark:bg-gray-950 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          {/* Logo */}
          <div className="flex items-center space-x-2">
            <svg className="h-8 w-8 text-orange-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12 2L2 7h3v6h3V9h2v4h3V7h3L12 2z" />
            </svg>
            <span className="text-xl font-bold">GroWheat</span>
          </div>

          {/*  Desktop nav links */}
          <div className="hidden sm:flex space-x-6">
            <Link
              to="/"
              onClick={() => setSelected("dashboard")}
              className={`hover:text-orange-500 transition-colors ${selected === "dashboard" ? "text-orange-500 font-medium" : "text-gray-300"}`}
            >
              Dashboard
            </Link>

            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="hover:text-orange-500 text-gray-300"
              >
                Forsøg
              </button>
              {isDropdownOpen && (
                <div className="absolute mt-2 bg-gray-800 dark:bg-gray-900 rounded-md shadow-lg z-10">
                  <Link to="/forsog1" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-300 hover:text-orange-500">Forsøg 1</Link>
                  <Link to="/forsog2" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-300 hover:text-orange-500">Forsøg 2</Link>
                </div>
              )}
            </div>

            <Link
              to="/prediction-form"
              onClick={() => setSelected("prediction-form")}
              className={`hover:text-orange-500 transition-colors ${selected === "prediction-form" ? "text-orange-500 font-medium" : "text-gray-300"}`}
            >
              Prediction
            </Link>

            <Link
              to="/profile"
              onClick={() => setSelected("profile")}
              className={`hover:text-orange-500 transition-colors ${selected === "profile" ? "text-orange-500 font-medium" : "text-gray-300"}`}
            >
              Profil
            </Link>
          </div>

          {/*  Logout Button */}
          <div className="hidden sm:flex">
            <button onClick={handleLogout} className="text-gray-300 hover:text-orange-500">
              Log ud
            </button>
          </div>

          {/*  Mobile Hamburger */}
          <div className="sm:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white hover:text-orange-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/*  Mobile menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden px-4 pt-2 pb-4 bg-gray-800 dark:bg-gray-900">
          <Link to="/" onClick={() => { setSelected("dashboard"); setIsMobileMenuOpen(false); }} className="block py-2 text-gray-300">
            Dashboard
          </Link>
          <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="block py-2 text-gray-300 hover:text-orange-500">
            Forsøg
          </button>
          {isDropdownOpen && (
            <div className="ml-4">
              <Link to="/forsog1" onClick={() => setIsDropdownOpen(false)} className="block py-1 text-sm text-gray-300 hover:text-orange-500">Forsøg 1</Link>
              <Link to="/forsog2" onClick={() => setIsDropdownOpen(false)} className="block py-1 text-sm text-gray-300 hover:text-orange-500">Forsøg 2</Link>
            </div>
          )}
          <Link to="/prediction-form" onClick={() => setSelected("prediction-form")} className="block py-2 text-gray-300">
            Prediction
          </Link>
          <Link to="/profile" onClick={() => setSelected("profile")} className="block py-2 text-gray-300">
            Profil
          </Link>
          <button onClick={handleLogout} className="block py-2 text-gray-300 hover:text-orange-500">
            Log ud
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
