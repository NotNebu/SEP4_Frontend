import logo from "@/assets/GroWheatLogo.png";

/**
 * NavbarBrand – Viser GroWheat-logoet i navbaren.
 * Bruges som branding-element i topnavigationen.
 */
export default function NavbarBrand() {
  return (
    <div className="flex items-center space-x-2">
      <img
        src={logo}
        alt="GroWheat Logo"
        className="h-60 w-60 object-contain"
      />
    </div>
  );
}
