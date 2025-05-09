import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ExperimentsModal({ isOpen, onClose }) {
  const [experiments, setExperiments] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      fetch("https://localhost:5107/api/experiment/my-experiments", {
        credentials: "include",
      })
        .then((res) => res.json())
        .then(setExperiments)
        .catch(console.error);
    }
  }, [isOpen]);

  const handleDelete = async (id) => {
    await fetch(`https://localhost:5107/api/experiment/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    setExperiments((prev) => prev.filter((exp) => exp.id !== id));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex justify-center items-center p-4">
      <div className="bg-white text-black rounded-xl shadow-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Dine Eksperimenter</h2>
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/create-experiment")}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              + Opret Nyt
            </button>
            <button
              className="text-sm text-gray-500 hover:text-red-500"
              onClick={onClose}
            >
              ✖ Luk
            </button>
          </div>
        </div>

        {experiments.length === 0 ? (
          <p>Du har ingen eksperimenter endnu.</p>
        ) : (
          <ul className="space-y-3">
            {experiments.map((exp) => (
              <li
                key={exp.id}
                className="border p-4 rounded-lg bg-gray-50 shadow-sm"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">{exp.title}</h3>
                    <p className="text-sm text-gray-600">{exp.description}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      Oprettet: {exp.createdAt}
                    </p>
                    {expanded === exp.id && (
                      <div className="mt-2 text-sm bg-gray-100 p-2 rounded font-mono text-gray-800 max-h-40 overflow-y-auto">
                        <pre>{exp.dataJson}</pre>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 items-end">
                    <button
                      onClick={() =>
                        setExpanded(expanded === exp.id ? null : exp.id)
                      }
                      className="text-blue-600 hover:underline text-sm"
                    >
                      {expanded === exp.id ? "Skjul info" : "Se mere"}
                    </button>
                    <button
                      onClick={() => handleDelete(exp.id)}
                      className="text-red-600 hover:underline text-sm"
                    >
                      Slet
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
