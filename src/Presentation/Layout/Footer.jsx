/**
 * Footer komponenten for applikationen.
 * Denne komponent viser bunden af siden, og indeholder copyright information samt links til 
 * privatlivspolitik og servicevilkår.*/

const Footer = () => {
    return (
      <footer className="bg-gray-800 text-white py-6 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-between">
            <div className="w-full sm:w-1/3 text-center sm:text-left">
              <h3 className="text-lg font-semibold">SEP4</h3>
              <p className="mt-2 text-sm">© 2025 SEP4. All rights reserved.</p>
            </div>
            <div className="w-full sm:w-1/3 text-center sm:text-right">
              <ul className="flex justify-center sm:justify-end space-x-4">
                <li><a href="/privacy" className="text-gray-300 hover:text-orange-500">Privacy Policy</a></li>
                <li><a href="/terms" className="text-gray-300 hover:text-orange-500">Terms of Service</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  