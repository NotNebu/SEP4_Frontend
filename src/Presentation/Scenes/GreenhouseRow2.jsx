import React from 'react';
import DashboardBox from '@Presentation/Components/DashboardBox';
import BoxHeader from '@Presentation/Layout/BoxHeader';
import SensorTable from '@Presentation/Tables/SensorTable';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { GreenhouseViewModel } from '@Application/ViewModels/GreenhouseViewModel';

const GreenhouseRow2 = () => {
  const { soilData, temperatureData, humidityData, distanceData } = GreenhouseViewModel();

  // Funktion til at formatere og sikre gyldig dato
  const formatData = (data) => {
    return data.map((entry) => {
      const time = new Date(entry.time);
      // Tjekker om datoen er gyldig, hvis ikke, returneres en placeholder
      const formattedTime = isNaN(time.getTime()) ? "Invalid Date" : time.toLocaleString();
      
      return {
        ...entry,
        time: formattedTime, // Returnerer entry med formateret tid
      };
    });
  };

  // Formatér alle datasæt sikkert
  const formattedSoilData = formatData(soilData);
  const formattedTemperatureData = formatData(temperatureData);
  const formattedHumidityData = formatData(humidityData);
  const formattedDistanceData = formatData(distanceData);

  // Map sensor data til tabelvisning
  const sensorData = [
    {
      id: 1,
      sensor: 'Temperature',
      value: `${formattedTemperatureData?.at(-1)?.temperature ?? 'N/A'} °C`,
      lastUpdate: formattedTemperatureData?.at(-1)?.time ?? 'N/A'
    },
    {
      id: 2,
      sensor: 'Humidity',
      value: `${formattedHumidityData?.at(-1)?.humidity ?? 'N/A'} %`,
      lastUpdate: formattedHumidityData?.at(-1)?.time ?? 'N/A'
    },
    {
      id: 3,
      sensor: 'Soil Moisture',
      value: `${formattedSoilData?.at(-1)?.soil ?? 'N/A'} %`,
      lastUpdate: formattedSoilData?.at(-1)?.time ?? 'N/A'
    },
    {
      id: 4,
      sensor: 'Distance',
      value: `${formattedDistanceData?.at(-1)?.distance ?? 'N/A'} cm`,
      lastUpdate: formattedDistanceData?.at(-1)?.time ?? 'N/A'
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Sensor Data Table */}
      <DashboardBox>
        <BoxHeader title="Seneste Sensoropdateringer" subtitle="Real-time sensor opdateringer" />
        <SensorTable data={sensorData} />
      </DashboardBox>

      {/* Jordfugtighed Diagram */}
      <DashboardBox className="flex justify-center items-center">
        <BoxHeader title="Jordfugtighed" subtitle="Sensor A1" sideText="Live Data" />
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={formattedSoilData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis unit="%" domain={[0, 100]} />
            <Tooltip />
            <Line type="monotone" dataKey="soil" stroke="#4caf50" dot={{ r: 3 }} activeDot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>

      {/* Andre diagrammer (Temperature, Humidity, Distance) kan tilføjes på samme måde */}
    </div>
  );
};

export default GreenhouseRow2;
