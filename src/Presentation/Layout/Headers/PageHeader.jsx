/**
 * PageHeader – Overskrift til sider med valgfrit ikon.
 * Bruges som hovedtitel øverst på en side eller sektion.
 */
export default function PageHeader({ title, icon }) {
  return (
    <h1 className="text-3xl font-bold text-white mb-8 text-center">
      {icon && <span className="mr-2">{icon}</span>}
      {title}
    </h1>
  );
}
