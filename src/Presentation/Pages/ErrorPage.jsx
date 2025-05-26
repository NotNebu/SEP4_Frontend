import { useLocation, useNavigate } from "react-router-dom";
import Card from "@/Presentation/Components/Shared/UI/Card";
import Button from "@/Presentation/Components/Shared/UI/Button";

/**
 * ErrorPage – Fejlvisning ved tekniske fejl eller manglende data.
 */
export default function ErrorPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const errorCode = location.state?.code || "Ukendt";
  const message =
    location.state?.message ||
    "Der opstod en teknisk fejl. Prøv venligst igen senere.";

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-black p-4 text-white">
      <Card className="max-w-md w-full text-center border border-red-600 bg-zinc-900">
        <h2 className="text-2xl text-red-400 mb-2">Noget gik galt…</h2>
        <p className="text-sm text-zinc-300 mb-2">{message}</p>
        <p className="text-xs text-zinc-500 mb-4">Fejlkode: {errorCode}</p>

        <div className="flex justify-center gap-4">
          <Button
            label="Prøv igen"
            variant="secondary"
            onClick={() => navigate(-1)}
          />
          <Button
            label="Gå til Dashboard"
            variant="primary"
            onClick={() => navigate("/")}
          />
        </div>
      </Card>
    </div>
  );
}
