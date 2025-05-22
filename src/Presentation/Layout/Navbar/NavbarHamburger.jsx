/**
 * NavbarHamburger – Mobilmenu-knap med ikon (3 linjer).
 * Viser/åbner navigation på små skærme.
 */
export default function NavbarHamburger({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="text-gray-300 hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded"
      aria-label="Åbn menu"
    >
      <svg
        className="h-6 w-6"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>
  );
}
