import { useState } from "react";

export default function ChangePasswordModal({ isOpen, onClose }) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSave = async () => {
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("Kodeordene matcher ikke!");
      return;
    }

    setLoading(true);

    try {
        const response = await fetch("http://localhost:5107/api/account/change-password", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include", // 👈 nødvendigt for cookies
            body: JSON.stringify({ oldPassword, newPassword }),
          });          

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Noget gik galt");
      } else {
        setSuccess(data.message || "Kodeord ændret!");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (err) {
      setError("Netværksfejl");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-white">Skift kodeord</h2>

        {error && <p className="text-red-500 mb-2">{error}</p>}
        {success && <p className="text-green-500 mb-2">{success}</p>}

        <div className="space-y-4">
          <Input label="Gammelt kodeord" type="password" value={oldPassword} onChange={setOldPassword} />
          <Input label="Nyt kodeord" type="password" value={newPassword} onChange={setNewPassword} />
          <Input label="Bekræft nyt kodeord" type="password" value={confirmPassword} onChange={setConfirmPassword} />
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-500 rounded text-white hover:bg-gray-700"
          >
            Annullér
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Gemmer..." : "Gem"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Input({ label, type, value, onChange }) {
  return (
    <div>
      <label className="block text-sm text-white mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
