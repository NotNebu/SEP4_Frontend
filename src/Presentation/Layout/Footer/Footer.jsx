import FooterBrand from "./FooterBrand";

/**
 * Footer – Viser bundsektionen med branding/logo.
 * Farver og layout er tilpasset mørkt tema.
 */
const Footer = () => {
  return (
    <footer className="bg-gray-800 dark:bg-gray-900 text-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centrér brand/logo i footeren */}
        <div className="flex justify-center items-center">
          <FooterBrand />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
