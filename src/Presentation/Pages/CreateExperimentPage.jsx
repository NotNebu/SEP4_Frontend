import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "@/Presentation/Components/Shared/UI/Input";
import Button from "@/Presentation/Components/Shared/UI/Button";
import Card from "@/Presentation/Components/Shared/UI/Card";
import Footer from "@/Presentation/Layout/Footer/Footer";
import { createExperiment } from "@/Application/Services/ExperimentService";

/**
 * CreateExperimentPage – Side hvor brugeren kan manuelt oprette et eksperiment.
 * Formularen viser samtidig et realtid-preview af input.
 */
export default function CreateExperimentPage() {
  const navigate = useNavigate();

  // Formularfelter
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [experimentNumber, setExperimentNumber] = useState("");
  const [temperature, setTemperature] = useState("");
  const [airHumidity, setAirHumidity] = useState("");
  const [soilHumidity, setSoilHumidity] = useState("");
  const [lightLevel, setLightLevel] = useState("");
  const [wateringActive, setWateringActive] = useState(false);
  const [error, setError] = useState(null);

  const dataJson = {
    experimentNumber: Number(experimentNumber),
    temperature: Number(temperature),
    airHumidity: Number(airHumidity),
    soilHumidity: Number(soilHumidity),
    lightLevel: Number(lightLevel),
    wateringActive: wateringActive,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const numTemp = Number(temperature);
    const numAir = Number(airHumidity);
    const numSoil = Number(soilHumidity);
    const numLight = Number(lightLevel);
    const numExp = Number(experimentNumber);

    // Validering af input
    if (numExp < 1 || numExp > 10000)
      return setError("Eksperimentnummer skal være mellem 1 og 10.000.");
    if (numTemp < -20 || numTemp > 50)
      return setError("Temperatur skal være mellem -20°C og 50°C.");
    if (numAir < 0 || numAir > 100)
      return setError("Luftfugtighed skal være mellem 0% og 100%.");
    if (numSoil < 0 || numSoil > 100)
      return setError("Jordfugtighed skal være mellem 0% og 100%.");
    if (numLight < 0 || numLight > 100000)
      return setError("Lysniveau skal være mellem 0 og 100.000 lux.");

    const dataJson = {
      experimentNumber: numExp,
      temperature: numTemp,
      airHumidity: numAir,
      soilHumidity: numSoil,
      lightLevel: numLight,
      wateringActive,
    };

    try {
      await createExperiment({ title, description, dataJson });
      alert("Eksperiment oprettet!");
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Der opstod en fejl ved oprettelsen.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <main className="flex-grow w-full max-w-screen-2xl mx-auto px-6 sm:px-10 xl:px-20 py-10">
        <h1 className="text-3xl font-bold text-center mb-10">
          Opret nyt eksperiment
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12 items-start w-full"
        >
          {/* FORMULARKOLONNE */}
          <div className="w-full space-y-4">
            <Input
              label="Titel"
              name="title"
              value={title}
              onChangeValue={setTitle}
              placeholder="Navn på eksperimentet"
            />
            <Input
              label="Beskrivelse"
              name="description"
              value={description}
              onChangeValue={setDescription}
              placeholder="Kort beskrivelse af eksperimentet"
            />
            <Input
              label="Eksperimentnummer"
              name="experimentNumber"
              type="number"
              value={experimentNumber}
              onChangeValue={setExperimentNumber}
              placeholder="1"
            />
            <Input
              label="Temperatur (°C)"
              name="temperature"
              type="number"
              value={temperature}
              onChangeValue={setTemperature}
              placeholder="22.5"
            />
            <Input
              label="Luftfugtighed (%)"
              name="airHumidity"
              type="number"
              value={airHumidity}
              onChangeValue={setAirHumidity}
              placeholder="60"
            />
            <Input
              label="Jordfugtighed (%)"
              name="soilHumidity"
              type="number"
              value={soilHumidity}
              onChangeValue={setSoilHumidity}
              placeholder="45"
            />
            <Input
              label="Lysniveau (lux)"
              name="lightLevel"
              type="number"
              value={lightLevel}
              onChangeValue={setLightLevel}
              placeholder="800"
            />
            {error && <p className="text-red-400 text-sm">{error}</p>}
          </div>

          {/* PREVIEW-KOLONNE */}
          <div className="w-full">
            <Card className="w-full bg-gray-800 text-white flex flex-col min-h-[420px] p-6 rounded-xl shadow-lg">
              <div>
                <h3 className="text-lg font-semibold mb-4">Forhåndsvisning</h3>
                <ul className="space-y-2 text-[15px] text-gray-200">
                  <li>
                    <strong>Eksperimentnummer:</strong>{" "}
                    {dataJson.experimentNumber}
                  </li>
                  <li>
                    <strong>Temperatur:</strong> {dataJson.temperature} °C
                  </li>
                  <li>
                    <strong>Luftfugtighed:</strong> {dataJson.airHumidity} %
                  </li>
                  <li>
                    <strong>Jordfugtighed:</strong> {dataJson.soilHumidity} %
                  </li>
                  <li>
                    <strong>Lysniveau:</strong> {dataJson.lightLevel} lux
                  </li>
                  <li>
                    <strong>Vanding:</strong>{" "}
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                        dataJson.wateringActive
                          ? "bg-green-600 text-white"
                          : "bg-red-600 text-white"
                      }`}
                    >
                      {dataJson.wateringActive ? "Aktiv" : "Ikke aktiv"}
                    </span>
                  </li>
                </ul>
              </div>

              <div className="mt-auto space-y-4 pt-6">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="wateringActive"
                    checked={wateringActive}
                    onChange={(e) => setWateringActive(e.target.checked)}
                    className="h-4 w-4 text-blue-600"
                  />
                  <label
                    htmlFor="wateringActive"
                    className="text-sm text-gray-300"
                  >
                    Vanding aktiv
                  </label>
                </div>
                <Button
                  label="Opret Eksperiment"
                  type="submit"
                  variant="primary"
                  fullWidth
                />
              </div>
            </Card>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}
