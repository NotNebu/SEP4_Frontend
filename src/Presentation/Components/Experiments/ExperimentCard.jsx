import Card from "@/Presentation/Components/Shared/UI/Card";
import Button from "@/Presentation/Components/Shared/UI/Button";
import ToggleTextButton from "@/Presentation/Components/Buttons/ToggleTextButton";

// Viser et enkelt eksperiment med titel, beskrivelse, data og handlinger
export default function ExperimentCard({
  exp,
  expanded,
  setExpanded,
  onDelete,
  onDownloadJSON,
  onDownloadCSV,
}) {
  const isExpanded = expanded === exp.id;

  let parsedData = [];

  // Forsøg at parse dataJson-feltet
  try {
    const rawData =
      typeof exp.dataJson === "string"
        ? JSON.parse(exp.dataJson)
        : exp.dataJson;

    if (Array.isArray(rawData)) {
      parsedData = rawData;
    } else if (typeof rawData === "object" && rawData !== null) {
      const keys = Object.keys(rawData);
      const isNumericKeyed = keys.every((k) => !isNaN(k));
      parsedData = isNumericKeyed ? keys.map((k) => rawData[k]) : [rawData];
    }
  } catch (err) {
    console.error("Fejl ved parsing af dataJson:", err);
  }

  return (
    <li>
      <Card>
        <div className="flex flex-col gap-4">
          {/* Titel og beskrivelse */}
          <div>
            <h3 className="text-lg font-semibold">
              {exp.title || "Eksperiment #Ukendt"}
            </h3>
            <p className="text-sm text-gray-600">
              {exp.description || "Ingen beskrivelse"}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Oprettet: {exp.createdAt}
            </p>
          </div>

          {/* Målinger vises kun hvis kortet er foldet ud */}
          {isExpanded && parsedData.length > 0 && (
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
              {parsedData.map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-800 text-sm text-white rounded-md p-3 border border-gray-700"
                >
                  <h4 className="font-semibold text-purple-400 mb-2">
                    Måling {index + 1}
                  </h4>
                  <ul className="space-y-1">
                    {Object.entries(item).map(([key, value]) => (
                      <li
                        key={key}
                        className="flex justify-between border-b border-gray-700 pb-1"
                      >
                        <span className="text-gray-300">{key}:</span>
                        <span className="text-gray-100 break-all text-right">
                          {String(value)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* Knapper til handlinger: download, vis/skjul og slet */}
          <div className="mt-4 flex flex-col gap-2 w-full sm:items-end sm:ml-4 sm:w-auto">
            <Button
              onClick={() => onDownloadJSON(exp)}
              label="Download JSON"
              variant="outline"
              className="text-sm w-full sm:w-auto"
            />
            <Button
              onClick={() => onDownloadCSV(exp)}
              label="Download CSV"
              variant="outline"
              className="text-sm w-full sm:w-auto"
            />
            <ToggleTextButton
              expanded={isExpanded}
              onClick={() => setExpanded(isExpanded ? null : exp.id)}
              labels={{ show: "Se mere", hide: "Skjul info" }}
              className="w-full sm:w-auto"
            />
            <Button
              onClick={() => onDelete(exp.id)}
              label="Slet"
              variant="danger"
              className="text-sm w-full sm:w-auto"
            />
          </div>
        </div>
      </Card>
    </li>
  );
}
