import logo from "@/assets/GroWheatLogo.png";

/**
 * FooterBrand – Viser logo og copyright.
 * Designet til centreret visning i footeren.
 */
export default function FooterBrand() {
  return (
    <div className="text-center flex flex-col items-center">
      <img
        src={logo}
        alt="GroWheat Logo"
        className="h-40 w-auto object-contain -mb-12"
      />
      <p className="text-sm text-gray-400">
        © 2025 GroWheat. Alle rettigheder forbeholdes.
      </p>
    </div>
  );
}
