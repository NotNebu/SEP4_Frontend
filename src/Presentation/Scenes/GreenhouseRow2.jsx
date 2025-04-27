import React, { useMemo } from 'react';
import DashboardBox from '@Presentation/Components/DashboardBox';
import BoxHeader from '@Presentation/Layout/BoxHeader';
import SensorTable from '@Presentation/Tables/SensorTable';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

/**
 * GreenhouseRow2 viser data for drivhussensorer såsom jordfugtighed og real time sensoropdateringer
 *
 * @returns {JSX.Element}
 */
const GreenhouseRow2 = () => {
  // Dummy sensor data til tabellen
  const sensorData = useMemo(() => [
    { id: 1, sensor: 'Temperature', value: '22°C', lastUpdate: '2025-04-08 12:30' },
    { id: 2, sensor: 'Humidity', value: '60%', lastUpdate: '2025-04-08 12:31' },
    { id: 3, sensor: 'Soil Moisture', value: '40%', lastUpdate: '2025-04-08 12:32' },
    { id: 4, sensor: 'CO2 Level', value: '300 ppm', lastUpdate: '2025-04-08 12:33' },
    { id: 5, sensor: 'Light', value: '500 lux', lastUpdate: '2025-04-08 12:34' },
    { id: 6, sensor: 'Distance', value: '15 cm', lastUpdate: '2025-04-08 12:35' }
  ], []);

  // Dummy jordfugtighed data (ens struktur som de andre grafer)
  const soilData = useMemo(() => [
    { time: '08:00', soil: 25 },
    { time: '10:00', soil: 30 },
    { time: '12:00', soil: 38 },
    { time: '14:00', soil: 37 }
  ], []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Seneste Sensoropdateringer */}
      <DashboardBox>
        <BoxHeader
          title="Seneste Sensoropdateringer"
          subtitle="Real-time sensor opdateringer"
        />
        <SensorTable sensorData={sensorData} />
      </DashboardBox>

      {/* Jordfugtighed */}
      <DashboardBox className="flex justify-center items-center">
        <BoxHeader
          title="Jordfugtighed"
          subtitle="Sensor A1"
          sideText="Aktuel: 37%"
        />
        <div className="w-full max-w-full flex justify-center"> 
          <ResponsiveContainer width="100%" height={250}> 
            <LineChart data={soilData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" interval={0} />
              <YAxis unit="%" domain={[0, 100]} />
              <Tooltip />
              <Line type="monotone" dataKey="soil" stroke="#4caf50" dot={{ r: 3 }} activeDot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </DashboardBox>

    </div>
  );
};

export default GreenhouseRow2;
