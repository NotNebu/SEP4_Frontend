/**
 * SidebarCard – Genbrugelig container til sidepanel-indhold.
 * Viser valgfrit ikon, titel og indhold centreret i en mørk boks.
 */
export default function SidebarCard({ title, icon, children }) {
  return (
    <div className="bg-gray-900 rounded-xl p-6 text-center">
      {/* Ikon i cirkel */}
      {icon && (
        <div className="w-32 h-32 mx-auto rounded-full border-2 border-blue-500 flex items-center justify-center text-blue-500 mb-4">
          {icon}
        </div>
      )}

      {/* Titel */}
      <p className="text-lg font-semibold mb-4">{title}</p>

      {/* Indhold */}
      {children}
    </div>
  );
}
