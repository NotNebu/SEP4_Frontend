import Card from "@/Presentation/Components/Shared/UI/Card";
import Button from "@/Presentation/Components/Shared/UI/Button";
import ToggleTextButton from "@/Presentation/Components/Buttons/ToggleTextButton";
import React from "react";

// Dansk oversættelse af datanøgler
const keyMap = {
  experimentNumber: "Eksperimentnr.",
  airTemperature: "Lufttemperatur (°C)",
  airHumidity: "Luftfugtighed (%)",
  soilMoisture: "Jordfugtighed (%)",
  soilType: "Jordtype",
  fertilizerType: "Gødningstype",
  temperature: "Temperatur (°C)",
  light: "Lysniveau (lux)",
  lightType: "Lyskilde",
  lightMin: "Min. lys",
  lightMax: "Maks. lys",
  lightAvg: "Gns. lys",
  lightVariation: "Lysvariation",
  artificialLight: "Kunstigt lys",
  distanceToHeight: "Afstand til plantehøjde (cm)",
  wateringActive: "Vanding aktiv",
  water: "Vanding aktiveret",
  waterAmount: "Vandmængde (L)",
  wateringFrequency: "Vandingsfrekvens (min)",
  timeSinceLastWatering: "Tid siden sidste vanding (min)",
  waterNeedScore: "Vandbehov-score",
  timestamp: "Tidspunkt",
};

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
  } catch (_) {}

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
                  className="bg-gray-800 text-sm text-white rounded-md p-4 border border-gray-700"
                >
                  <h4 className="font-semibold text-purple-400 mb-3">
                    Måling {index + 1}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                    {Object.entries(item).map(([key, value]) => (
                      <React.Fragment key={key}>
                        <div className="text-gray-300 font-medium">
                          {keyMap[key] || key}:
                        </div>
                        <div className="text-gray-100 text-center break-words">
                          {key === "timestamp"
                            ? new Date(value).toLocaleString("da-DK")
                            : typeof value === "boolean"
                            ? value
                              ? "Ja"
                              : "Nej"
                            : String(value)}
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
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
