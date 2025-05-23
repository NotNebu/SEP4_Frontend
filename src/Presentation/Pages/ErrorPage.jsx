import { useLocation, useNavigate } from "react-router-dom";

/**
 * ErrorPage – Fejlvisning ved tekniske fejl eller manglende data.
 * Viser fejlkode og besked med mulighed for at gå tilbage eller til dashboard.
 */
export default function ErrorPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Hent fejlinfo fra routing state, eller brug standardbeskeder
  const errorCode = location.state?.code || "Ukendt";
  const message =
    location.state?.message ||
    "Der opstod en teknisk fejl. Prøv venligst igen senere.";

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-black text-white p-4">
      <div className="bg-zinc-900 p-6 rounded shadow-lg max-w-md w-full text-center border border-red-600">
        {/* Overskrift */}
        <div className="text-red-400 text-2xl mb-2">Noget gik galt…</div>

        {/* Fejlbesked */}
        <p className="text-sm text-zinc-300 mb-4">{message}</p>

        {/* Fejlkode */}
        <p className="text-zinc-500 text-xs mb-6">Fejlkode: {errorCode}</p>

        {/* Handlingsknapper */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="border px-4 py-2 rounded hover:bg-zinc-800 transition"
          >
            Prøv Igen
          </button>
          <button
            onClick={() => navigate("/")}
            className="border px-4 py-2 rounded hover:bg-zinc-800 transition"
          >
            Gå til Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
